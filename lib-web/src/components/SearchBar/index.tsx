import React from 'react'
import { ChangeEvent } from 'react'
import { FaSearch } from 'react-icons/fa'
import styles from './style.module.css'

type Props = {
    placeholder?: string
    onChange: Function,
}

const SearchBar = ({ placeholder, onChange }: Props) => {
    return (
        <div className={styles.container}>
            <div className={styles.iconBox}>
                <FaSearch className={styles.icon} ></FaSearch>
            </div>
            <input
                type="search"
                name=""
                id=""
                className={styles.input}
                placeholder={placeholder}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    onChange(event);
                }}
            />
        </div>)
}

export default SearchBar
