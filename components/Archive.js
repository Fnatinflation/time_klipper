import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import db from "../firebase"
import { auth } from "../firebase"

class Archive extends React.Component {
    constructor(props) {
        super(props)
        this.state = { jobs: [] }
    }
    componentDidMount() {
        db.collection(auth.currentUser.uid).where("archived", '==', true).get().then(querySnapshot => {
            const doc = querySnapshot.docs.map(doc => doc.data());
            this.setState({
                jobs: doc.map((doc) => ({
                    title: doc.title,
                    desc: doc.desc,
                    units: doc.units,
                    price: doc.price,
                    active: doc.active,
                    initUnits: doc.initUnits
                }))
            })
        })
    }
    deArchive = (job) => {
        db.collection(auth.currentUser.uid).doc(job.title).update({
            archived: false
        }).then(() => window.location.reload())

    }

    render() {
        return (
            <div style={{padding: "20px"}}>
                <h1 style={{marginBottom:'20px'}}>Arkiv</h1>

                {
                    this.state.jobs.map((job, index) => {
                        return <Row style={{height: "40px" }} key={index}>
                            <Col style={{ verticalAlign: "middle", lineHeight: "40px" }} md="2" lg="2">
                                <p>
                                    {job.title}
                                </p>
                            </Col>
                            <Col>
                                <Button style={{ verticalAlign: "middle", backgroundColor: "#1796ff" }} onClick={() => this.deArchive(job)}>De-Archive</Button>
                            </Col>
                            <hr></hr>
                        </Row>
                    })
                }
            </div>

        )
    }

} export default Archive