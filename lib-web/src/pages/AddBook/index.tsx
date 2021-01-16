import React, { useState } from 'react';
import styles from './style.module.css'
import { FaArrowLeft } from 'react-icons/fa'
import { useHistory } from 'react-router-dom';
import { FormEvent } from 'react';
import { ChangeEvent } from 'react';
import { bookService } from '../../services/book.service'
import { NewBookInterface } from '../../interface/bookInterface'
import ModalMessage from '../../components/ModalMessage'

const AddBook = () => {

    const history = useHistory();
    const [submit, setSubmit] = useState(false)
    const [data, setData] = useState<NewBookInterface>({
        titulo: '',
        autor: '',
        categoria: ''
    });


    function handleDataSubmit(e: FormEvent) {
        e.preventDefault();

        bookService.createNewBook(data)
            .then(
                response => {
                    console.log(response)
                },
                error => {
                    console.log('requisition failed');
                }
            )


        const reset = {
            titulo: '',
            autor: '',
            categoria: ''
        }
        console.log(data)
        setData(reset)
        setSubmit(true)
    }

    return (
        <div>

            {
                submit ?
                    <ModalMessage content={'Livro Adcionado !'} onClick={()=>{setSubmit(false)}}></ModalMessage>
                    :
                    <div className={styles.container}>
                        <div className={styles.iconBox} onClick={() => { history.push('/') }}>
                            <FaArrowLeft></FaArrowLeft>
                            <p className={styles.a}>Voltar</p>
                        </div>
                        <h2>Adcionar Livro</h2>
                        <form className={styles.form} onSubmit={handleDataSubmit}>
                            <input
                                className={styles.input}
                                type="text"
                                placeholder="Titulo"
                                value={data.titulo}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    const value = e.target.value;
                                    setData(prevState => {
                                        return { ...prevState, titulo: value }
                                    });
                                }}
                            />
                            <input
                                className={styles.input}
                                type="text"
                                placeholder="Autor"
                                value={data.autor}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    const value = e.target.value;
                                    setData(prevState => {
                                        return { ...prevState, autor: value }
                                    });
                                }}
                            />
                            <input
                                className={styles.input}
                                type="text"
                                placeholder="Categoria"
                                value={data.categoria}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    const value = e.target.value;
                                    setData(prevState => {
                                        return { ...prevState, categoria: value }
                                    });
                                }}
                            />
                            <button className={styles.button}>Salvar</button>
                        </form>
                    </div>
            }

        </div>
    )
}

export default AddBook;