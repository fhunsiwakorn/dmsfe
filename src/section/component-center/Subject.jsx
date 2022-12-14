import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import { LinkContainer } from "react-router-bootstrap";
import Functions from "../../functions";
import Common from "../../common";
import axios from "axios";
const school_id = Common.getUserLoginData.school_id;
export default class Subject extends Component {
  state = {
    subject_id: 0,
    subject_code: "",
    subject_name: 0,
    subject_type: 0,
    subject_learn_type: 0,
    active: 1,
    vehicle_type_id: 0,
    isOpenModal: false,
    isOpenModalDelete: false,
    msg: "",
    data: [],
    vt: [],
    param: [],
    page: 1,
    search_value: "",
  };

  refreshData = async () => {
    try {
      await axios
        .post(
          Common.API_URL + `course/subject/${school_id}?only=false`,
          {
            page: this.state.page,
            per_page: 25,
            search_value: this.state.search_value,
          },
          Common.options
        )
        .then((response) => {
          let res = response.data;
          this.setState({ data: res.data, param: res });
        });
    } catch (error) {
      console.log(error);
    }
  };
  getVehicleType = async () => {
    try {
      await axios
        .get(Common.API_URL + "masterdata/vehicle_type")
        .then((response) => {
          let res = response.data;
          this.setState({ vt: res });
        });
    } catch (error) {
      console.log(error);
    }
  };

  handleSubmit = () => {
    if (
      this.state.subject_code === "" ||
      this.state.subject_name === "" ||
      this.state.subject_type === 0 ||
      this.state.subject_type === 0 ||
      this.state.vehicle_type_id === 0
    ) {
      this.setState({ msg: "???????????????????????????????????????????????????????????????" });
      return false;
    }
    try {
      axios
        .post(
          Common.API_URL + "course/subject/create",
          {
            subject_code: this.state.subject_code,
            subject_name: this.state.subject_name,
            subject_type: this.state.subject_type,
            subject_learn_type: this.state.subject_learn_type,
            active: this.state.active,
            vehicle_type_id: this.state.vehicle_type_id,
            school_id: school_id,
          },
          Common.options
        )
        .then((res) => {
          this.setState({ isOpenModal: false });
          this.refreshData();
        });
    } catch (error) {
      console.log(error);
    }
  };

  handleClickEdit = (res) => {
    let r = res;
    this.setState({
      subject_id: r.subject_id,
      subject_code: r.subject_code,
      subject_name: r.subject_name,
      subject_type: r.subject_type,
      subject_learn_type: r.subject_learn_type,
      active: r.active,
      vehicle_type_id: r.vehicle_type_id,
      school_id: r.school_id,
      msg: "",
    });
  };
  handleSubmitEdit = () => {
    if (
      this.state.subject_code === "" ||
      this.state.subject_name === "" ||
      this.state.subject_type === 0 ||
      this.state.subject_type === 0 ||
      this.state.vehicle_type_id === 0
    ) {
      this.setState({ msg: "???????????????????????????????????????????????????????????????" });
      return false;
    }
    try {
      axios
        .put(
          Common.API_URL + `course/subject/${this.state.subject_id}`,
          {
            subject_code: this.state.subject_code,
            subject_name: this.state.subject_name,
            subject_type: this.state.subject_type,
            subject_learn_type: this.state.subject_learn_type,
            active: this.state.active,
            vehicle_type_id: this.state.vehicle_type_id,
            school_id: school_id,
          },
          Common.options
        )
        .then((res) => {
          this.setState({ isOpenModal: false });
          this.clearState();
          this.refreshData();
        });
    } catch (error) {
      console.log(error);
    }
  };
  handleDelete = () => {
    try {
      axios
        .delete(
          Common.API_URL + `course/subject/${this.state.subject_id}`,
          Common.options
        )
        .then((res) => {
          this.setState({ isOpenModalDelete: false, subject_id: 0 });
          this.refreshData();
        });
    } catch (error) {
      console.log(error);
    }
  };
  clearState = () => {
    this.setState({
      subject_id: 0,
      subject_code: "",
      subject_name: "",
      subject_type: 0,
      subject_learn_type: 0,
      vehicle_type_id: 0,

      msg: "",
    });
  };
  onChangeFilter = () => {
    this.refreshData();
  };
  componentDidMount() {
    this.refreshData();
    this.getVehicleType();
  }

  render() {
    const { subject_id } = this.state;
    const { subject_code } = this.state;
    const { subject_name } = this.state;
    const { subject_type } = this.state;
    const { subject_learn_type } = this.state;
    const { vehicle_type_id } = this.state;
    const { active } = this.state;

    const { data } = this.state;
    const { vt } = this.state;
    const { param } = this.state;
    const { isOpenModal } = this.state;
    const { isOpenModalDelete } = this.state;
    const { msg } = this.state;
    const { page } = this.state;
    return (
      <div>
        <Row>
          <Col sm={8}>
            <h3>?????????????????????</h3>
          </Col>
          <Col sm={4}>
            <Breadcrumb>
              <LinkContainer to="/">
                <Breadcrumb.Item>????????????????????????</Breadcrumb.Item>
              </LinkContainer>
              <Breadcrumb.Item active>?????????????????????</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>
        <Card border="info">
          <Card.Header>
            <Row>
              <Col sm={8}>????????????????????????????????????</Col>
              <Col sm={4}>
                <div align="right">
                  <Button
                    onClick={(e) => [
                      this.setState({
                        isOpenModal: true,
                      }),
                      this.clearState(),
                    ]}
                  >
                    ?????????????????????????????????
                  </Button>
                </div>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col sm={9}>????????????????????????????????? {param.total_data} ????????????????????????</Col>
              <Col sm={3}>
                <Form.Control
                  type="text"
                  placeholder="???????????????"
                  onChange={(e) => [
                    this.setState({
                      search_value: e.target.value,
                    }),
                    this.onChangeFilter(),
                  ]}
                  onKeyUp={(e) => [
                    this.setState({
                      search_value: e.target.value,
                    }),
                    this.onChangeFilter(),
                  ]}
                />
              </Col>
            </Row>

            <Table striped>
              <thead>
                <tr>
                  <th>????????????????????????</th>
                  <th>????????????</th>
                  <th>??????????????????????????????????????????</th>
                  <th>??????????????????????????????</th>
                  <th>??????????????????????????????????????????</th>
                  <th>???????????????</th>
                  <th>?????????????????????????????????</th>
                  <th>??????????????????</th>
                </tr>
              </thead>
              <tbody>
                {data.map((rs, index) => (
                  <tr key={index}>
                    <td>{rs.subject_code}</td>
                    <td>{rs.subject_name}</td>
                    <td>{Functions.vehicle_type[rs.vehicle_type_id - 1]}</td>
                    <td>{Functions.subject_type[rs.subject_type - 1]} </td>
                    <td>
                      {Functions.subject_learn_type[rs.subject_learn_type - 1]}
                    </td>
                    <td>
                      {rs.active === 1 ? (
                        <span style={{ color: "blue" }}>????????????</span>
                      ) : (
                        <span style={{ color: "red" }}>?????????</span>
                      )}
                    </td>
                    <td>{Functions.format_date_time(rs.create_date)} </td>
                    <td>
                      {rs.school_id === school_id && (
                        <ButtonGroup>
                          <DropdownButton
                            title="??????????????????"
                            id="bg-nested-dropdown"
                            variant="warning"
                          >
                            <Dropdown.Item
                              eventKey="2"
                              onClick={(e) => [
                                this.setState({
                                  isOpenModal: true,
                                }),
                                this.handleClickEdit(rs),
                              ]}
                            >
                              ???????????????
                            </Dropdown.Item>
                            <Dropdown.Item
                              eventKey="3"
                              onClick={(e) =>
                                this.setState({
                                  isOpenModalDelete: true,
                                  subject_id: rs.subject_id,
                                })
                              }
                            >
                              ??????
                            </Dropdown.Item>
                          </DropdownButton>
                        </ButtonGroup>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Row>
              <Col></Col>
              <Col sm={2}>
                <InputGroup className="mb-3" size="sm">
                  <InputGroup.Text>?????????????????????</InputGroup.Text>
                  <Form.Control
                    type="number"
                    defaultValue={page}
                    onChange={(e) => [
                      this.setState({
                        page: e.target.value,
                      }),
                      this.onChangeFilter(),
                    ]}
                    onKeyUp={(e) => [
                      this.setState({
                        page: e.target.value,
                      }),
                      this.onChangeFilter(),
                    ]}
                    onClick={(e) => [
                      this.setState({
                        page: e.target.value,
                      }),
                      this.onChangeFilter(),
                    ]}
                    style={{ textAlign: "center" }}
                  />
                  <InputGroup.Text>
                    ????????????????????? {param.total_page} ????????????
                  </InputGroup.Text>
                </InputGroup>
              </Col>
              <Col></Col>
            </Row>
          </Card.Body>
        </Card>
        {/* Form Subject */}
        <Modal show={isOpenModal}>
          <Modal.Header>
            <Modal.Title>?????????????????????</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {msg !== "" && <Alert variant="danger">{msg}</Alert>}

            <Form.Group className="mb-3">
              <Form.Label>????????????????????????</Form.Label>
              <Form.Control
                type="text"
                required
                onChange={(e) =>
                  this.setState({ subject_code: e.target.value })
                }
                defaultValue={subject_code}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>????????????</Form.Label>
              <Form.Control
                type="text"
                required
                onChange={(e) =>
                  this.setState({ subject_name: e.target.value })
                }
                defaultValue={subject_name}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>??????????????????????????????</Form.Label>
              <Form.Select
                onChange={(e) =>
                  this.setState({ subject_type: e.target.value })
                }
                value={subject_type}
              >
                <option value="">--?????????????????????????????????--</option>
                <option value="1">??????????????????????????????</option>
                <option value="2">???????????????????????????????????????</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>??????????????????????????????????????????</Form.Label>
              <Form.Select
                onChange={(e) =>
                  this.setState({ subject_learn_type: e.target.value })
                }
                value={subject_learn_type}
              >
                <option value="">--?????????????????????????????????--</option>
                <option value="1">???????????????</option>
                <option value="2">?????????????????????</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>??????????????????????????????????????????</Form.Label>
              <Form.Select
                onChange={(e) =>
                  this.setState({ vehicle_type_id: e.target.value })
                }
                value={vehicle_type_id}
              >
                <option value="">--?????????????????????????????????--</option>
                {vt.map((rs, index) => (
                  <option value={rs.vehicle_type_id} key={index}>
                    {rs.vehicle_type_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>???????????? - ?????????</Form.Label>
              <Form.Select
                onChange={(e) => this.setState({ active: e.target.value })}
                defaultValue={active}
              >
                <option value="0">?????????</option>
                <option value="1">????????????</option>
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={(e) =>
                this.setState({
                  isOpenModal: false,
                })
              }
            >
              ??????????????????????????????????????????
            </Button>

            <Button
              variant="primary"
              type="button"
              onClick={
                subject_id === 0 ? this.handleSubmit : this.handleSubmitEdit
              }
            >
              ??????????????????
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Form Delete Subject */}
        <Modal show={isOpenModalDelete} size="sm">
          <Modal.Header>
            <Modal.Title>?????????????????????</Modal.Title>
          </Modal.Header>
          <Modal.Body>?????????????????????????????????????????????????????? !</Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={(e) => this.setState({ isOpenModalDelete: false })}
            >
              ??????????????????
            </Button>
            <Button variant="danger" onClick={this.handleDelete}>
              ??????
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
