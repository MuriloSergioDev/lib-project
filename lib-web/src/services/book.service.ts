import api from './api';
import { NewBookInterface } from '../interface/bookInterface'

export const bookService = {
    listAllBooks,
    createNewBook,
    deleteBookById,
    updateBookById
};

interface FullBookInterface {
    id?: string
    titulo?: string
    categoria?: string
    autor?: string
}

async function listAllBooks() {
    try {
        const response = await api.get(`listAll.php`);

        return response;
    } catch (error) {
        return error;
    }
}

async function createNewBook(book: NewBookInterface) {
    try {
        const response = await api.post(`createOne.php`, book);

        return response;
    } catch (error) {
        return error;
    }
}

async function deleteBookById(id: string) {
    try {
        const response = await api.delete(`deleteOne.php`, { data: { id: id } });

        return response;
    } catch (error) {
        return error;
    }
}

async function updateBookById(book: FullBookInterface) {
    try {
        const response = await api.put(`updateOne.php`, book);

        return response;
    } catch (error) {
        return error;
    }
}