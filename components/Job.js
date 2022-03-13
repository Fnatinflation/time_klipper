import React from 'react'
import { Row, Col, Button, Form } from 'react-bootstrap'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import db from '../firebase';
import { auth } from "../firebase"
import { firebase } from '../firebase';
import styles from '../styles/Global.module.css'


class Job extends React.Component {
    constructor(props) {
        super(props)
        this.state = { units: this.props.units, unitsToUse: 0, active: this.props.active, unitDesc: '', unitDescs: this.props.unitDesc }
    }

    componentDidUpdate(nextProps) {
        if (this.props != nextProps) {
            this.setState({
                units: this.props.units,
                unitsToUse: 0,
                active: this.props.active,
                unitDescs:this.props.unitDesc
            });
        }
    }


    handleUnitChange = (event) => {
        if (!this.state.unitsToUse > this.props.units) {
            this.setState({ unitsToUse: event.target.value })
        }
    }
    handleDescChange = (event) => {
        this.setState({ unitDesc: event.target.value })
    }

    handleSubmit(event) {
        if (this.state.unitsToUse > 0) {
            confirmAlert({
                title: 'Brug klip',
                message: 'Er du sikker på du vil bruge ' + this.state.unitsToUse + ' klip, til en værdi af ' + this.state.unitsToUse * this.props.price + ',-?',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () => this.detractUnits()
                    },
                    {
                        label: 'No',
                    }
                ]
            });
        }

    }

    detractUnits = () => {
        let unit = { unitsUsed: this.state.unitsToUse, unitDesc: this.state.unitDesc, timestamp: firebase.firestore.Timestamp.now() }
        let activeTemp = true
        if (this.state.units - this.state.unitsToUse == 0) {
            activeTemp = false
        }
        this.setState((prevState, props) => ({
            units: prevState.units - this.state.unitsToUse,
            active: activeTemp,
            unitDescs: [...this.state.unitDescs, ...[unit]]
        }))


        db.collection("Users").doc(auth.currentUser.uid).collection("Jobs").doc(this.props.title).update({
            units: this.state.units - this.state.unitsToUse,
            active: activeTemp,
            unitDesc: firebase.firestore.FieldValue.arrayUnion(unit)
        })



    }

    archive = () => {
        db.collection("Users").doc(auth.currentUser.uid).collection("Jobs").doc(this.props.title).update({
            archived: true
        }).then(() => window.location.reload())

    }

    render() {

        const unitlessJob =
            <div>
                <Row>
                    <p style={{ textDecoration: "underline" }}>Dette job er afsluttet.</p>

                    <Col>
                        <p>Antal klip brugt: {this.props.initUnits}</p>
                        <p>Timepris: {this.props.price},-</p>
                        <p>Samlet værdi: {this.props.initUnits * this.props.price},-</p>
                    </Col>
                    <Row style={{display:"flex",justifyContent:"center"}}>
                        <Button variant="danger" style={{ width: "100px" }} onClick={this.archive}>Arkiver</Button>
                    </Row>
                </Row>
            </div>

        return (
            <div style={{ padding: "20px" }}>
                <Row>
                    <h1>{this.props.title}</h1>
                </Row>
                <Row>
                    <p>{this.props.desc}</p>
                </Row>
                {!this.state.active ? unitlessJob :
                    <Row>
                        <Col>
                            <p style={{ textAlign: "center" }}>Klip tilbage</p>
                            <div className={styles.numberBox}>
                                {this.state.units}
                            </div>
                        </Col>
                        <Col>
                            <Form.Group style={{marginTop:"50px"}} className="mb-3" controlId="formUnitDesc">
                                <Form.Control style={{ margin: "0 auto", display: "block" }} as="textarea" rows={3} className={styles.unitDescInput} name="unitDesc" value={this.state.unitDesc} onChange={event => this.handleDescChange(event)} type="text" placeholder="Brugsbeskrivelse ..." />
                            </Form.Group>
                            <Button style={{ margin: "0 auto", display: "block",backgroundColor:"#1796ff" }} onClick={event => this.handleSubmit(event)}>Brug</Button>
                            <p style={{ textAlign: "center" }}>Værdi: {this.state.unitsToUse * this.props.price} </p>
                        </Col>
                        <Col>
                            <Row>
                                <Col>
                                    <p style={{ textAlign: "center" }}>Brug klip</p>
                                    <Form.Group className="mb-3" controlId="formUnitsToUse">
                                        <Form.Control className={styles.numberBox} name="unitsToUse" value={this.state.unitsToUse} onChange={event => this.handleUnitChange(event)} type="number" placeholder="0" />
                                    </Form.Group>
                                    <p style={{ textAlign: "center" }}>Klipværdi: {this.props.price}</p>

                                </Col>
                                <Col style={{ marginLeft: "-100px",display:"flex", alignItems:"flex-start" ,flexDirection:"column",marginTop:"40px"}}>
                                    <Button className={styles.changeUnitsButton} onClick={() => {
                                        if (this.state.unitsToUse < this.props.units) {
                                            this.setState((prevState, props) => ({
                                                unitsToUse: prevState.unitsToUse + 0.25
                                            }))
                                        }
                                    }}>+</Button>
                                    <Button className={styles.changeUnitsButton} onClick={() => {
                                        if (this.state.unitsToUse > 0.00) {
                                            this.setState((prevState, props) => ({
                                                unitsToUse: prevState.unitsToUse - 0.25
                                            }))
                                        }
                                    }}>-</Button>
                                </Col>
                            </Row>


                        </Col>
                    </Row>
                }
                <hr></hr>
                <Row>
                    <h3>
                        Brugte Klip
                    </h3>
                </Row>
                <Row>
                    {this.state.unitDescs.map((ud, index) => {
                        let date = ud.timestamp.toDate()
                        let minutes = date.getMinutes()
                        console.log(minutes.toString.length)

                        if(minutes.toString().length === 1){
                            minutes = "0" + minutes
                        }
                        return <div key={index}>{ud.unitsUsed} klip brugt d. {date.getDate()}/{date.getMonth() + 1}-{date.getFullYear()} kl. {date.getHours()}:{minutes} - {ud.unitDesc}</div>
                    })}
                </Row>

            </div>
        )
    }

} export default Job
