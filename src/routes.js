
import { Database } from './database.js';
import { randomUUID } from 'node:crypto';
import { buildRoutePath } from './utils/build-route-path.js';

const database = new Database();
export const routes = [
    {
        method: 'GET',
        url: buildRoutePath('/users'),
        handler: (request, response) => {
            const { search } = request.query;
            const users = database.select('users',search ? {
                name: search,
                email: search,
            }: null);
            return response
                .end(JSON.stringify(users));
        }
    },
    {
        method: 'POST',
        url: buildRoutePath('/users'),
        handler: (request, response) => {
            const { name, email } = request.body;
            const user = {
                name: name,
                email: email,
                id: randomUUID(),
            };
            database.insert('users', user);
            return response.end('Criar usuário');
        }
    },
    {
        method: 'PUT',
        url: buildRoutePath('/users/:id'),
        handler: (request, response) => {
            const { id } = request.params;
            const { name, email } = request.body;
            const user = {
                name: name,
                email: email,
                id: id,
            };
            database.update('users', user);
            return response.end('Atualizar usuário');
        }
    },
    {
        method: 'DELETE',
        url: buildRoutePath('/users/:id'),
        handler: (request, response) => {
            const { id } = request.params;
            database.delete('users', id);
            return response.writeHead(204).end();
        }
    },
];