import Head from 'next/head'
import { Button, Row, Col, Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/Global.module.css'
import Job from '../components/Job.js'
import AddJob from '../components/AddJob.js'
import React from 'react'
import TitleBar from '../components/TitleBar';
import db from "../firebase"
import { auth } from "../firebase"
import { Router, withRouter } from 'next/router';
import Link from 'next/link'
import Archive from '../components/Archive'



const dummyJob = {
    title: "Aav Dæk",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    units: 10,
    price: 500
}
class Welcome extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            jobView: <h2 style={{
                textAlign: "center", verticalAlign: "middle", lineHeight: "94vh"
            }}>Vælg en opgave</h2>, jobs: []
        }
        this.addNew = this.addNew.bind(this);
        this.jobClicked = this.jobClicked.bind(this);
    }


    componentDidMount() {
        if (auth.currentUser) {
            this.fetchJobs()
        }
    }
    componentDidUpdate() {
        if (auth.currentUser) {
            this.fetchJobs()
        }
    }
    fetchJobs = () => {
        db.collection("Users").doc(auth.currentUser.uid).collection("Jobs").where("archived", '==', false).get().then(querySnapshot => {
            const doc = querySnapshot.docs.map(doc => doc.data());
            this.setState({
                jobs: doc.map((doc) => ({
                    title: doc.title,
                    desc: doc.desc,
                    units: doc.units,
                    price: doc.price,
                    active: doc.active,
                    initUnits: doc.initUnits,
                    archived: doc.archived,
                    unitDesc: doc.unitDesc
                }))
            })
        })
    }


    addNew() {
        this.setState({ jobView: <AddJob jobSubmitted={this.jobSubmitted}></AddJob> })
    }

    jobClicked(job) {
        this.setState({
            jobView: <Job title={job.title} desc={job.desc} units={job.units} price={job.price} active={job.active} initUnits={job.initUnits} unitDesc={job.unitDesc}></ Job>
        })
    }

    jobSubmitted = (job) => {
        this.setState(prevState => ({
            jobs: [...prevState.jobs, job]
        }))
    }

    showArchives = () => {
        this.setState({
            jobView: <Archive></Archive>
        })
    }

    render() {
        if (!auth.currentUser) {
            return (
                <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                    <p>Du skal være logget ind for at tilgå denne side</p>
                    <Link href="/">Klik her for at logge ind</Link>
                </div>
            )
        } else {
            return (
                <Container className={styles.body} fluid>
                    <TitleBar></TitleBar>
                    <Row>
                        <Col className={styles.menu} xs="2" sm="2" md="2" lg="2">
                            <h3>Utils</h3>
                            <p className={styles.menuItem} onClick={this.addNew}>Opret ny</p>
                            <p className={styles.menuItem} onClick={this.showArchives}>Arkiv</p>
                            <hr></hr>
                            <h3>Aftaler</h3>
                            {this.state.jobs.map((job, index) => {
                                return <p className={styles.menuItem} key={index} onClick={() => this.jobClicked(job)}>{job.title}</p>
                            })}
                        </Col>
                        <Col>
                            {this.state.jobView}
                        </Col>
                    </Row>
                </Container >

            )
        }

    }
} export default withRouter(Welcome)