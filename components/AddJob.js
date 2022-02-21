import { Row, Col, Form, Button } from 'react-bootstrap'
import React from 'react'
import db from "/firebase"
import Job from '/components/Job.js';
import { auth } from '/firebase';
import styles from '/styles/Global.module.css'

class AddJob extends React.Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = { title: '', desc: '', price: '0', units: '0' }
        this.onSubmit = this.onSubmit.bind(this)

    }
    onSubmit = (event) => {
        event.preventDefault()
        let job = { title: this.state.title, desc: this.state.desc, price: this.state.price, units: this.state.units, active: true, initUnits: this.state.units, archived: false, unitDesc: [] }
        db.collection("Users").doc(auth.currentUser.uid).collection("Jobs").doc(job.title).set(job).then(() => {
            console.log('Write succeeded!');
            window.location.reload()
        });
    }
    handleChange = (event) => {
        const name = event.target.name
        this.setState({ [name]: event.target.value })
    }
    render() {
        return (
            <Form style={{ padding: "20px" }} onSubmit={this.onSubmit}>
                <h1>Opret Aftale</h1>
                <Form.Group className="mb-3" controlId="formTitle">
                    <Form.Control name="title" value={this.state.title} onChange={event => this.handleChange(event)} type="text" placeholder="Enter Title ..." />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formDesc">
                    <Form.Control as="textarea" rows={5} name="desc" value={this.state.desc} onChange={event => this.handleChange(event)} type="text" placeholder="Enter Description ..." />
                </Form.Group>
                <Row>
                    <Col>
                        <p style={{ textAlign: "center" }}>Pris</p>

                        <Form.Group className="mb-3  " controlId="formPrice">
                            <Form.Control name="price" className={styles.numberBox} value={this.state.price} onChange={event => this.handleChange(event)} type="number" placeholder="0" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Button style={{ margin: "0 auto", display: "block", height: "80px", width: "200px", marginTop: "50px" ,backgroundColor:"#1796ff"}} type="submit">Opret</Button>
                        <p style={{ textAlign: "center" }}>Samlet værdi af aftalen: {this.state.price*this.state.units}</p>

                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="formUnits">
                            <p style={{ textAlign: "center" }}>Klip</p>
                            <Form.Control name="units" value={this.state.units} className={styles.numberBox} onChange={event => this.handleChange(event)} type="number" placeholder="0" />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>

        )
    }
} export default AddJob