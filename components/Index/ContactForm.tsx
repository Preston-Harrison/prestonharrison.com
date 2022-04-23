import React from 'react'
import styles from '../../styles/Index/ContactForm.module.scss'

const ContactForm = () => {
    return (
        <form
            className={styles['contact-form-container']}
            action="https://formsubmit.co/9ad373e07486c60a2fd5b5ef1797c145"
            method="POST"
            id='contact-form'
        >
            <h1>
                Contact me
            </h1>
            <div className={styles['form-body']}>
                <div>
                    <label htmlFor='email-or-phone'>email / phone number</label>
                    <input
                        type="text"
                        id="email-or-phone"
                        className={`expand`}
                        name="contact"
                    />
                </div>
                <div>
                    <label htmlFor='organization-name'>organization / name</label>
                    <input
                        type="text"
                        id="organization-name"
                        className={`expand`}
                        name="name-or-organisation"
                    />
                </div>
                <div>
                    <label htmlFor='message'>message</label>
                    <textarea id="message" form='contact-form' name="message" />
                </div>
                <button className={styles['send-message']} type="submit">
                    send message
                </button>
            </div>
        </form>
    )
}

export default ContactForm