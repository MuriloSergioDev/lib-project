import React, { useState, useEffect } from 'react';
import styles from './style.module.css'
import BookModal from '../../components/BookModal'
import SearchBar from '../../components/SearchBar'
import { FaArrowLeft, FaArrowRight, FaPlus } from 'react-icons/fa'
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import { bookService } from '../../services/book.service'
import { BookInterface } from '../../interface/bookInterface'

const Home = () => {

    const history = useHistory()
    let { page } = useParams<{ page: string }>()
    const [search, setSearch] = useState<string>('')
    const [books, setBooks] = useState<BookInterface[]>()
    let arrowClassLeft = ['iconArrow']
    let arrowClassRight = ['iconArrow']

    useEffect(() => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        try {
            bookService.listAllBooks()
                .then(
                    response => {
                        // console.log(response.data.body)
                        if (response.data !== undefined) {
                            setBooks(response.data.body);    
                        }
                    },
                    error => {
                        console.log('requisition failed');
                    }
                )
        } catch (error) {
            console.log(error)
        }
        return () => {
            source.cancel('Operation canceled by the user.');
        };
    }, [])

    function handleChangePage(direction: string) {

        if (direction === 'left') {
            if (parseInt(page) - 1 >= 1) {
                history.push(`/home/${parseInt(page) - 1}`)
            }
        } else {
            if (filtered && parseInt(page) + 1 <= Math.ceil(filtered?.length / 6)) {
                history.push(`/home/${parseInt(page) + 1}`)
            }
        }
    }

    function filterBySearch(book: BookInterface) {
        if (book.titulo?.toLocaleLowerCase()?.indexOf(search.toLowerCase()) !== -1 ||
            book.autor?.toLocaleLowerCase()?.indexOf(search.toLowerCase()) !== -1 ||
            book.categoria?.toLocaleLowerCase()?.indexOf(search.toLowerCase()) !== -1) {
            return book
        }
    }

    const filtered = books?.filter(filterBySearch)

    if (parseInt(page) - 1 >= 1) {
        arrowClassLeft.splice(0, 1)
        arrowClassLeft.push(styles.iconArrow)
    } else {
        arrowClassLeft.splice(0, 1)
        arrowClassLeft.push(styles.iconArrowDisable)
    }

    if (filtered && parseInt(page) + 1 <= Math.ceil(filtered?.length / 6)) {
        arrowClassRight.splice(0, 1)
        arrowClassRight.push(styles.iconArrow)
    } else {
        arrowClassRight.splice(0, 1)
        arrowClassRight.push(styles.iconArrowDisable)
    }

    return (
        <div className={styles.container}>

            <div className={styles.iconBox} onClick={() => { history.push('/addBook') }}>
                <FaPlus></FaPlus>
                <p className={styles.a}>Adcionar Livro</p>
            </div>

            <SearchBar placeholder="Procure por título, autor ou categoria" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const value = event.target.value;
                setSearch(value);
            }}></SearchBar>
            <div className={styles.arrowBox}>
                <FaArrowLeft className={arrowClassLeft.join(' ')} onClick={() => handleChangePage('left')}></FaArrowLeft>
                <FaArrowRight className={arrowClassRight.join(' ')} onClick={() => handleChangePage('right')} ></FaArrowRight>
            </div>
            <div className={styles.containerModal}>
                {
                    filtered != null ?
                        filtered.map((book: BookInterface, index: number) => {

                            if (index >= (parseInt(page) - 1) * 6 && index <= ((parseInt(page) - 1) * 6) + 5) {
                                return <BookModal key={book.id} book={book}></BookModal>
                            }

                            return null
                        })
                        : <div>Carregando ...</div>
                }
            </div>
        </div>)
}

export default Home;