# How to Build and Start

### 1. Edit frontend/src/main.tsx
```diff
axios.defaults.withCredentials = true;
- axios.defaults.baseURL = "http://localhost:3000";
+ axios.defaults.baseURL = "/";
axios.defaults.headers.post["Content-Type"] = "application/json";
```

### 2. Run the Command
```shell
# Build Frontend
$ cd frontend
$ npm run build

# Run Product
$ cd ..
$ npm start
```