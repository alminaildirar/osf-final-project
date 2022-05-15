const express = require('express');

//------Init Express App---------
const app = express();

app.listen(5000, () =>
    console.log(`Server running on PORT 5000`)
);