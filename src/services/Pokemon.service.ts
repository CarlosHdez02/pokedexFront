import { TrainerInterface, TrainerInterfaceCreate } from '../interfaces/TrainerInterface';

export class TrainerService {
    private baseUrl = 'http://localhost:3000/api/';

    constructor() { }

    public async delete(id: string) {
        try {
            this.errorHandler(await this.requestHandler('DELETE', `trainers/${id}`))
        } catch (error) {
            throw error;
        }
    }

    public async create(body: TrainerInterfaceCreate):Promise<string> {
        try {
            const response = this.errorHandler(await this.requestHandler('POST', 'trainers', body))
            const data = await response.json()
            return data._id;
        } catch (error) {
            throw error;
        }
    }

    public async update(id: string, body: TrainerInterface) {
        try {
            return this.errorHandler(await this.requestHandler('PUT', `trainers/${id}`, body))
        } catch (error) {
            throw error;
        }
    }

    public async get() {
        try {
            this.errorHandler(await this.requestHandler('GET', 'trainers'))
        } catch (error) {
            throw error;
        }
    }

    private errorHandler(response: Response) {
        if (!response.ok) {
            throw new Error("Failed to fetch trainers");
        }
        return response
    }

    private requestHandler(method: string, entity: string, body?: TrainerInterface | TrainerInterfaceCreate):Promise<Response> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        const url = new URL(entity, this.baseUrl);

        const options: RequestInit = {
            headers,
            method
        };

        if (body) {
            options.body = JSON.stringify(body)
        }
        const request = fetch(url, options)

        return request;
    }
}