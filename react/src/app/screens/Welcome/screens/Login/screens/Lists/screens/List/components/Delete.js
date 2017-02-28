import React from 'react';
import { Button, Glyphicon, Modal, Row, Col } from 'react-bootstrap';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

const modalIsVisible = observable(false);

const showModal = () => { modalIsVisible.set(true) };

const hideModal = () => { modalIsVisible.set(false) };

export default observer(({ onClick }) => (
    <Button bsStyle="danger" bsSize="small" onClick={showModal}>
        <Glyphicon glyph="trash"/>
        {' '}
        Delete
        <Modal show={modalIsVisible.get()} onHide={hideModal} bsSize="small" aria-labelledby="contained-modal-title-sm">
            <Modal.Header>
                <Modal.Title id="contained-modal-title-sm" className="text-center">
                    Delete list confirmation
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to delete this list?</p>
                <p>It'll be gone for good!</p>
            </Modal.Body>
            <Modal.Footer>
                <Row>
                    <Col xs={12} className="text-center">
                        <Button onClick={e => { hideModal(); onClick(e)}} bsStyle="danger">
                            <strong>Yes</strong>, delete it.
                        </Button>
                        {' '}
                        <Button onClick={hideModal}><strong>No</strong>, keep it.</Button>
                    </Col>
                </Row>
            </Modal.Footer>
        </Modal>
    </Button>
));
