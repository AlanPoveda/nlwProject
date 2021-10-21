import { useContext, useState, FormEvent } from "react";
import { VscGithubInverted, VscSignOut } from "react-icons/vsc";
import { AuthContext } from "../../contexts/auth";
import { api } from "../../services/api";
import styles from "./styles.module.scss";

export function SendMessageForm() {
    //Pegar as information do contexts
    const { user, singOut } = useContext(AuthContext)
    const [ message, setMessage] = useState("");

    async function handleSendMessage(event: FormEvent){
        if(!message.trim()){
            return;
        }

        await api.post('messages', { message })
    }

    return (
        <div className={styles.sendMessageFormWrapper}>
            <button onClick={singOut} className={styles.singOutButton}>
                <VscSignOut size="32" />
            </button>
            <header className={styles.userInformation}>
                <div className={styles.userImage}>
                    <img src={user?.avatar_url} alt={user?.name} />
                </div>
                <strong className={styles.userName}>{user?.name}</strong>
                <span className={styles.userGithub}>
                    <VscGithubInverted size="16" />
                    {user?.login}
                </span>

            </header>

            <form onSubmit={handleSendMessage} className={styles.sendMessageForm}>
                <label htmlFor="message">Message</label>
                <textarea
                    name="Message"
                    id="Message"
                    placeholder="Make a Heap 🐱"
                    onChange={ event => setMessage(event.target.value)}
                    value={message}
                />

                <button type="submit">Send Heap</button>


            </form>
        </div>
    );
}