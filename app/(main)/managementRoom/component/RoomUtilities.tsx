import React from "react";
import { Form, Input, Switch, Button, Row, Col, Card, Divider } from "antd";

interface RoomUtility {
  furnitureAvailability: Record<string, boolean>;
  amenitiesAvailability: Record<string, boolean>;
}

interface FormValues {
  roomUtility?: {
    furnitureAvailability: Array<{
      type: string;
      available: boolean;
    }>;
    amenitiesAvailability: Array<{
      type: string;
      available: boolean;
    }>;
  };
}

interface RoomUtilityFormProps {
  roomUtility?: RoomUtility;
}

const RoomUtilityForm: React.FC<RoomUtilityFormProps> = ({
  roomUtility = {
    furnitureAvailability: {},
    amenitiesAvailability: {},
  },
}) => {
  const [form] = Form.useForm<FormValues>();

  const transformToObject = (values: FormValues): RoomUtility => {
    const furnitureObj: Record<string, boolean> = {};
    const amenitiesObj: Record<string, boolean> = {};

    const furniture = values.roomUtility?.furnitureAvailability || [];
    const amenities = values.roomUtility?.amenitiesAvailability || [];

    furniture.forEach((item) => {
      if (item?.type) {
        furnitureObj[item.type] = item.available || false;
      }
    });

    amenities.forEach((item) => {
      if (item?.type) {
        amenitiesObj[item.type] = item.available || false;
      }
    });

    return {
      furnitureAvailability: furnitureObj,
      amenitiesAvailability: amenitiesObj,
    };
  };

  const initialFurniture = Object.entries(
    roomUtility.furnitureAvailability
  ).map(([type, available], index) => ({
    key: index,
    type,
    available,
  }));

  const initialAmenities = Object.entries(
    roomUtility.amenitiesAvailability
  ).map(([type, available], index) => ({
    key: index,
    type,
    available,
  }));

  return (
    <Form form={form} onFinish={transformToObject} layout="vertical">
      <Card
        title="Room Utilities"
        bordered={false}
        style={{ marginBottom: 24 }}
      >
        {/* Furniture Availability */}
        <Form.Item label={<h3 style={{ margin: 0 }}>Furniture Availability</h3>}>
          <Form.List
            name={["roomUtility", "furnitureAvailability"]}
            initialValue={initialFurniture}
          >
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Card
                    key={key}
                    size="small"
                    style={{ marginBottom: 16 }}
                    bordered={false}
                    className="bg-gray-50"
                  >
                    <Row gutter={16} align="middle">
                      <Col span={12}>
                        <Form.Item
                          {...restField}
                          name={[name, "type"]}
                          label="Furniture Type"
                          rules={[
                            { required: true, message: "Enter furniture type" },
                          ]}
                          style={{ marginBottom: 0 }}
                        >
                          <Input placeholder="Enter furniture type" />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          {...restField}
                          name={[name, "available"]}
                          label="Available"
                          valuePropName="checked"
                          style={{ marginBottom: 0 }}
                        >
                          <Switch />
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Button danger onClick={() => remove(name)}>
                          Remove
                        </Button>
                      </Col>
                    </Row>
                  </Card>
                ))}
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  style={{ marginBottom: 24 }}
                >
                  Add Furniture Item
                </Button>
              </>
            )}
          </Form.List>
        </Form.Item>

        <Divider />

        {/* Amenities Availability */}
        <Form.Item label={<h3 style={{ margin: 0 }}>Amenities Availability</h3>}>
          <Form.List
            name={["roomUtility", "amenitiesAvailability"]}
            initialValue={initialAmenities}
          >
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Card
                    key={key}
                    size="small"
                    style={{ marginBottom: 16 }}
                    bordered={false}
                    className="bg-gray-50"
                  >
                    <Row gutter={16} align="middle">
                      <Col span={12}>
                        <Form.Item
                          {...restField}
                          name={[name, "type"]}
                          label="Amenity Type"
                          rules={[
                            { required: true, message: "Enter amenity type" },
                          ]}
                          style={{ marginBottom: 0 }}
                        >
                          <Input placeholder="Enter amenity type" />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          {...restField}
                          name={[name, "available"]}
                          label="Available"
                          valuePropName="checked"
                          style={{ marginBottom: 0 }}
                        >
                          <Switch />
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Button danger onClick={() => remove(name)}>
                          Remove
                        </Button>
                      </Col>
                    </Row>
                  </Card>
                ))}
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                >
                  Add Amenity Item
                </Button>
              </>
            )}
          </Form.List>
        </Form.Item>
      </Card>
    </Form>
  );
};

export default RoomUtilityForm;