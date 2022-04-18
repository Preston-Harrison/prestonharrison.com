import React from 'react'
import styles from '../styles/ContactForm.module.scss'

const ContactForm = () => {
    return (
        <div className={styles['contact-form-container']}>
            <h1>
                Contact me
            </h1>
            <div className={styles['form-body']}>
                <div>
                    <label htmlFor='email-or-phone'>email / phone number</label>
                    <input type="text" id="email-or-phone" className={`expand`} />
                </div>
                <div>
                    <label htmlFor='organization-name'>organization / name</label>
                    <input type="text" id="organization-name" className={`expand`} />
                </div>
                <div>
                    <label htmlFor='message'>message</label>
                    <textarea id="message" />
                </div>
                <button className={styles['send-message']}>
                    send message
                </button>
            </div>
        </div>
    )
}

export default ContactForm