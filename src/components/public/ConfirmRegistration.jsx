import { useApi } from "contexts/ApiContext.js";
import { useConfig } from "contexts/ConfigContext.js";
import { useMessages } from "contexts/MessagesContext.js";
import { useTranslation } from "contexts/TranslationContext.js";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ConfirmRegistration = () => {

    const { id, token } = useParams();
    const { post } = useApi();
    const [confirmed, setConfirmed] = useState(false);
    const [error, setError] = useState('');
    const { __ } = useTranslation();
    const { addMessage } = useMessages();
    const { realm } = useConfig();

    useEffect(() => {
        if (realm && !confirmed && !error) {
            let data = { id: id, token: token }
            post('/confirm-registration', data)
                .then((response) => {
                    setConfirmed(true);
                }).catch((error) => {
                    console.warn(error)
                    setError(error.statusText)
                    addMessage("danger", error.statusText);
                })
        }
    })

    return (
        <div>
            <h2>Registration Confirmed!</h2>
            <p>Id: #{id}</p>
            <p>token: #{token}</p>
            {!confirmed ? <p>{__('Finalizing registration, please wait.')}</p> : <p>{__('Now you can log in.')}</p>}
        </div>
    )
}

export default ConfirmRegistration;