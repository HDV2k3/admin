import React from "react";
import { Form, Input, InputNumber, Row, Col } from "antd";

interface roomInfo {
  name: string;
  description: string;
  address: string;
  type: string;
  style: string;
  floor: string;
  width: number;
  height: number;
  totalArea: number;
  capacity: number;
  numberOfBedrooms: number;
  numberOfBathrooms: number;
  availableFromDate?: string;
}

interface roomInfoFormProps {
  roomInfo?: roomInfo;
}

const RoomInfoForm: React.FC<roomInfoFormProps> = ({}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (
    <>
      <Form.Item
        label="Room Name"
        name={["roomInfo", "name"]}
        rules={[{ required: true, message: "Room name is required" }]}
      >
        <Input
          min={0}
          style={{ width: "100%" }}
          placeholder={"Enter room name"}
        />
      </Form.Item>

      <Form.Item label="Room Description" name={["roomInfo", "description"]}>
        <Input.TextArea placeholder={"Enter room description"} />
      </Form.Item>

      <Form.Item label="Address" name={["roomInfo", "address"]}>
        <Input placeholder={"Enter room address"} />
      </Form.Item>

      <Form.Item label="Room Type" name={["roomInfo", "type"]}>
        <Input placeholder={"Enter room type"} />
      </Form.Item>

      <Form.Item label="Room Style" name={["roomInfo", "style"]}>
        <Input placeholder={"Enter room style"} />
      </Form.Item>

      <Form.Item label="Floor" name={["roomInfo", "floor"]}>
        <Input placeholder={"Enter floor"} />
      </Form.Item>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Width" name={["roomInfo", "width"]}>
            <InputNumber
              min={1}
              style={{ width: "100%" }}
              placeholder={"Enter width"}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Height" name={["roomInfo", "height"]}>
            <InputNumber
              min={1}
              style={{ width: "100%" }}
              placeholder={"Enter height"}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Total Area (m²)" name={["roomInfo", "totalArea"]}>
            <InputNumber
              min={1}
              style={{ width: "100%" }}
              placeholder={"Enter total area"}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Capacity" name={["roomInfo", "capacity"]}>
            <InputNumber
              min={1}
              style={{ width: "100%" }}
              placeholder={"Enter capacity"}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Number of Bedrooms"
            name={["roomInfo", "numberOfBedrooms"]}
          >
            <InputNumber
              min={1}
              style={{ width: "100%" }}
              placeholder={"Enter number of bedrooms"}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Number of Bathrooms"
            name={["roomInfo", "numberOfBathrooms"]}
          >
            <InputNumber
              min={1}
              style={{ width: "100%" }}
              placeholder={"Enter number of bathrooms"}
            />
          </Form.Item>
        </Col>
      </Row>

      {/* <Form.Item label="DatePicker" name={["roomInfo", "availableFromDate"]}>
        <DatePicker />
      </Form.Item> */}
    </>
  );
};

export default RoomInfoForm;
