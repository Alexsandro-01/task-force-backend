import api from './server';

const PORT = 3000;

api.listen(PORT, () => console.log(`Listen at port: ${PORT}`));