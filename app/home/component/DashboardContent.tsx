// components/DashboardContent.tsx

import { Row, Col, Card } from "antd";
import React from "react";

const DashboardContent: React.FC = () => (
  <div style={{ padding: "24px" }}>
    <Row gutter={16}>
      <Col span={8}>
        <Card title="Metric 1" bordered={false}>
          Content for metric 1
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Metric 2" bordered={false}>
          Content for metric 2
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Metric 3" bordered={false}>
          Content for metric 3
        </Card>
      </Col>
    </Row>
  </div>
);

export default DashboardContent;
