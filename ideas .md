# Handle multiple YouTube connections

## on page load:
    create uuid for page

## on any post or get:
    send data and a JSON object with the following {Platform: "Ytmusic", uuid: page uuid} 
### info JSON

```JSON
{
"platform": "*supported platform",
"uuid": "36b8f84d-df4e-4d49-b662-bcde71a8764f"
}
```
