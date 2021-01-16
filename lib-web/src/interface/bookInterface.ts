export interface BookInterface {
    id : string,
    titulo?: string,
    autor?: string,
    categoria?: string,
}

export interface NewBookInterface {
    titulo?: string,
    categoria?: string,
    autor?: string,
}