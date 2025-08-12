body {
  font-family: Arial, sans-serif;
  background-color: #f0f8ff;
  margin: 0;
  padding: 20px;
  color: #333;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.malla {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.año {
  background: #e6f2ff;
  border: 2px solid #99ccff;
  border-radius: 10px;
  padding: 15px;
  width: 300px;
}

.año h2 {
  text-align: center;
  color: #0066cc;
}

button {
  display: block;
  width: 100%;
  margin: 5px 0;
  padding: 10px;
  background: #b3d9ff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s;
}

button:hover:not(.bloqueado):not(.aprobado) {
  background: #80bfff;
}

button.bloqueado {
  background: #cccccc;
  cursor: not-allowed;
}

button.aprobado {
  background: #66cc66;
  color: white;
}
