import React from 'react';
import styles from './style.module.css';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { bookService } from '../../services/book.service'
import { useHistory } from 'react-router-dom';
import { BookInterface} from '../../interface/bookInterface'

interface Props {
    book: BookInterface
}

const BookModal = ({ book }: Props) => {

    const history = useHistory();

    function handleEdit() {
        history.push(`/editBook/${book.id}`);
    }

    function handleDelete() {
        //const comfirmation = window.confirm('Are you shure');
        if (window.confirm('Do you really want do delete this Book?')) {
            bookService.deleteBookById(book.id)
                .then(
                    (response: { status: number; }) => {
                        if (response.status === 200) {
                            console.log('Book deleted');
                            history.push('/Book-delete');
                        }

                    },
                    (error: any) => {
                        console.log('Fail in delete Book');
                    }
                )
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.containerHeader}><h1>{book.titulo}</h1></div>

            <div className={styles.containerStatus}>
                <h1>Autor</h1>
                <h2>{book.autor}</h2>
                <h1>Categoria </h1>
                <h2>{book.categoria}</h2>
            </div>
            <div className={styles.groupIcon}>
                <FaEdit className={styles.icon} onClick={handleEdit}></FaEdit>
                <FaTrash className={styles.icon} onClick={handleDelete}></FaTrash>
            </div>
        </div>
    );
}

export default BookModal;