# Handle multiple YouTube connections

## on page load:
    create uuid for page

## on any post or get:
    send data and a JSON object with the following {Platform: "Ytmusic", uuid: page uuid} 
### info JSON

```JSON
{
"platform": "*open platform *",
"uuid": "36b8f84d-df4e-4d49-b662-bcde71a8764f"
}
```

## open platforms
Open platforms are referring to platforms that by the software linking to can and will not leak your personal data.  The only platforms that are allowed are listed below 
| Platforms |
| --------- |
| Youtube   |
| Youtube Music |
