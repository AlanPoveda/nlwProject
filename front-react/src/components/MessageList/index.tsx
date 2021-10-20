import styles from "./styles.module.scss"

import logoImg from "../../assets/logo.svg"

export function MessageList(){
    return(
        <div className={styles.messageListWrapper}>
            <img src={logoImg} alt="Do While 2021" />

            <ul className={styles.messageList}>
                <li className={styles.message}>
                    <p className={styles.messageContent}>
                        Opa, vamos ver como vai ser
                    </p>
                    <div className={styles.messageUser}>
                        <div className={styles.userImage}>
                            <img src="https://github.com/alanpoveda.png" alt="Alan Poveda" />
                        </div>
                        <span>Alan Poveda</span>
                    </div>
                </li>
                <li className={styles.message}>
                    <p className={styles.messageContent}>
                        Opa, vamos ver como vai ser
                    </p>
                    <div className={styles.messageUser}>
                        <div className={styles.userImage}>
                            <img src="https://github.com/alanpoveda.png" alt="Alan Poveda" />
                        </div>
                        <span>Alan Poveda</span>
                    </div>
                </li>
                <li className={styles.message}>
                    <p className={styles.messageContent}>
                        Opa, vamos ver como vai ser
                    </p>
                    <div className={styles.messageUser}>
                        <div className={styles.userImage}>
                            <img src="https://github.com/alanpoveda.png" alt="Alan Poveda" />
                        </div>
                        <span>Alan Poveda</span>
                    </div>
                </li>
            </ul>

        </div>
    )
}