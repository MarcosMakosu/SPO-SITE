import http.server
import socketserver
import json
import os
import cgi
import uuid
import sys

# Configuration
PORT = 8000
DATA_FILE = 'data.json'
PUBLIC_DIR = 'public'

class SimpleHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Serve API Routes
        if self.path.startswith('/api/'):
            self.handle_api_get()
        # Serve SPA (Single Page App) - Redirect unknown paths to index.html
        elif '.' not in self.path:
            self.path = '/public/index.html'
            return http.server.SimpleHTTPRequestHandler.do_GET(self)
        # Serve Static Files
        else:
            # Security: Prevent path traversal
            if '..' in self.path:
                self.send_error(403)
                return
            
            # Map /public for static files
            if not self.path.startswith('/public/'):
                self.path = '/public' + self.path
                
            return http.server.SimpleHTTPRequestHandler.do_GET(self)

    def do_POST(self):
        if self.path.startswith('/api/'):
            self.handle_api_post()
        else:
            self.send_error(404)

    def do_DELETE(self):
        if self.path.startswith('/api/'):
            self.handle_api_delete()
        else:
            self.send_error(404)

    # --- API HANDLERS ---

    def handle_api_get(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()

        data = self.load_data()
        
        if self.path == '/api/doctors':
            self.wfile.write(json.dumps(data['doctors']).encode())
        elif self.path == '/api/events':
            self.wfile.write(json.dumps(data['events']).encode())
        else:
            self.wfile.write(json.dumps({"error": "Endpoint not found"}).encode())

    def handle_api_post(self):
        if self.path == '/api/login':
            content_length = int(self.headers['Content-Length'])
            body = self.rfile.read(content_length)
            creds = json.loads(body)
            
            data = self.load_data()
            user = next((u for u in data['users'] if u['username'] == creds.get('username') and u['password'] == creds.get('password')), None)
            
            self.send_response(200 if user else 401)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            
            if user:
                self.wfile.write(json.dumps({"token": "fake-jwt-token-123", "name": user['name']}).encode())
            else:
                self.wfile.write(json.dumps({"error": "Invalid credentials"}).encode())
            return

        # Protected Routes (Simple check)
        if not self.headers.get('Authorization'):
            self.send_response(401)
            self.end_headers()
            return

        # Parse Body
        content_length = int(self.headers['Content-Length'])
        body = self.rfile.read(content_length)
        payload = json.loads(body)
        
        data = self.load_data()
        
        if self.path == '/api/doctors':
            payload['id'] = str(uuid.uuid4())
            data['doctors'].append(payload)
            self.save_data(data)
            self.send_json(payload)
            
        elif self.path == '/api/events':
            payload['id'] = str(uuid.uuid4())
            data['events'].append(payload)
            self.save_data(data)
            self.send_json(payload)
            
        else:
            self.send_error(404)

    def handle_api_delete(self):
        # Protected
        if not self.headers.get('Authorization'):
            self.send_response(401)
            self.end_headers()
            return

        data = self.load_data()
        path_parts = self.path.split('/')
        resource = path_parts[2] # doctors or events
        res_id = path_parts[3] if len(path_parts) > 3 else None

        if resource == 'doctors' and res_id:
            data['doctors'] = [d for d in data['doctors'] if d['id'] != res_id]
            self.save_data(data)
            self.send_json({"status": "deleted"})
            
        elif resource == 'events' and res_id:
            data['events'] = [e for e in data['events'] if e['id'] != res_id]
            self.save_data(data)
            self.send_json({"status": "deleted"})
            
        else:
            self.send_error(404)

    # --- HELPERS ---
    def load_data(self):
        with open(DATA_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)

    def save_data(self, data):
        with open(DATA_FILE, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)

    def send_json(self, data):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(data).encode())

print(f"Servidor rodando em http://localhost:{PORT}")
# Allow address reuse
socketserver.TCPServer.allow_reuse_address = True
with socketserver.TCPServer(("", PORT), SimpleHandler) as httpd:
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nParando servidor...")
        httpd.shutdown()
