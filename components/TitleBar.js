import { Button, Row, Col, Container } from 'react-bootstrap'
import styles from '../styles/Global.module.css'
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Link from 'next/link'


export default function TitleBar() {
    const signOut = () => {
        auth.signOut();
    }
    const home = () => {
    }

    const [user] = useAuthState(auth);
    if (!user) {
        return (
            <Row className={styles.header}>
                Please log in
            </Row>
        )


    }
    else {
        return (
            <Row className={styles.header}>
                <Col>
                    <h3 className={styles.logo} onClick={home}>TimeKlipper</h3>
                </Col>
                <Col>
                    <p className={styles.phoneNumber}>
                        {auth.currentUser.phoneNumber}
                    </p>
                </Col>
                <Col>
                    <h3 className={styles.signOut} onClick={signOut}>Log ud</h3>
                </Col>
            </Row>
        )
    }

}