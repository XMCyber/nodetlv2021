This project is a nestjs project, which contains major security issues.

##### It has 2 groups of routes:

### POST /login: receives username and password in json form.

Example:
```javascript
{
    "username" : "tamar1", 
    "password" : "12345"
}
```

### GET /health: performing health check via several methods

Example:
```
GET /health

```

