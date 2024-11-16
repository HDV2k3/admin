// /* eslint-disable @typescript-eslint/no-unused-vars */
// // import React from "react";
// // import { Form, InputNumber, Input, Button, Row, Col } from "antd";

// // interface PricingDetailsFormProps {
// //   pricingDetails: PricingDetails;
// // }

// // const PricingDetailsForm: React.FC<PricingDetailsFormProps> = ({
// //   pricingDetails,
// // }) => {
// //   return (
// //     <>
// //       {/* Base Price */}
// //       <Form.Item label="Base Price" name={["pricingDetails", "basePrice"]}>
// //         <InputNumber
// //           min={0}
// //           style={{ width: "100%" }}
// //           placeholder={
// //             pricingDetails.basePrice?.toString() || "Enter base price"
// //           }
// //         />
// //       </Form.Item>

// //       {/* Electricity Cost */}
// //       <Form.Item
// //         label="Electricity Cost"
// //         name={["pricingDetails", "electricityCost"]}
// //       >
// //         <InputNumber
// //           min={0}
// //           style={{ width: "100%" }}
// //           placeholder={
// //             pricingDetails.electricityCost?.toString() ||
// //             "Enter electricity cost"
// //           }
// //         />
// //       </Form.Item>

// //       {/* Water Cost */}
// //       <Form.Item label="Water Cost" name={["pricingDetails", "waterCost"]}>
// //         <InputNumber
// //           min={0}
// //           style={{ width: "100%" }}
// //           placeholder={
// //             pricingDetails.waterCost?.toString() || "Enter water cost"
// //           }
// //         />
// //       </Form.Item>

// //       {/* Additional Fees */}
// //       <Form.Item label="Additional Fees">
// //         <Form.List name={["pricingDetails", "additionalFees"]}>
// //           {(fields, { add, remove }) => (
// //             <>
// //               {fields.map(({ key, name, ...restField }) => (
// //                 <Row gutter={16} key={key}>
// //                   <Col span={10}>
// //                     <Form.Item {...restField} name={[name, "type"]}>
// //                       <Input placeholder="Fee type (e.g., Service, Cleaning)" />
// //                     </Form.Item>
// //                   </Col>
// //                   <Col span={10}>
// //                     <Form.Item {...restField} name={[name, "amount"]}>
// //                       <InputNumber min={0} style={{ width: "100%" }} />
// //                     </Form.Item>
// //                   </Col>
// //                   <Col span={4}>
// //                     <Button onClick={() => remove(name)}>Remove</Button>
// //                   </Col>
// //                 </Row>
// //               ))}
// //               <Button type="dashed" onClick={() => add()}>
// //                 Add Additional Fee
// //               </Button>
// //             </>
// //           )}
// //         </Form.List>
// //       </Form.Item>
// //     </>
// //   );
// // };

// // export default PricingDetailsForm;
// import React from "react";
// import { Form, InputNumber, Input, Button, Row, Col } from "antd";

// interface PricingDetails {
//   basePrice: number;
//   electricityCost: number;
//   waterCost: number;
//   additionalFees: { type: string; amount: number }[];
// }

// interface PricingDetailsFormProps {
//   pricingDetails: PricingDetails;
// }

// const PricingDetailsForm: React.FC<PricingDetailsFormProps> = ({
//   pricingDetails,
// }) => {
//   return (
//     <Form
//       initialValues={{
//         pricingDetails,
//       }}
//       onFinish={(values) => console.log(values)}
//     >
//       {/* Base Price */}
//       <Form.Item label="Base Price" name={["pricingDetails", "basePrice"]}>
//         <InputNumber
//           min={0}
//           style={{ width: "100%" }}
//           placeholder={
//             pricingDetails.basePrice?.toString() || "Enter base price"
//           }
//         />
//       </Form.Item>

//       {/* Electricity Cost */}
//       <Form.Item
//         label="Electricity Cost"
//         name={["pricingDetails", "electricityCost"]}
//       >
//         <InputNumber
//           min={0}
//           style={{ width: "100%" }}
//           placeholder={
//             pricingDetails.electricityCost?.toString() ||
//             "Enter electricity cost"
//           }
//         />
//       </Form.Item>

//       {/* Water Cost */}
//       <Form.Item label="Water Cost" name={["pricingDetails", "waterCost"]}>
//         <InputNumber
//           min={0}
//           style={{ width: "100%" }}
//           placeholder={
//             pricingDetails.waterCost?.toString() || "Enter water cost"
//           }
//         />
//       </Form.Item>

//       {/* Additional Fees */}
//       <Form.Item label="Additional Fees">
//         <Form.List name={["pricingDetails", "additionalFees"]}>
//           {(fields, { add, remove }) => (
//             <>
//               {fields.map(({ key, name, fieldKey, ...restField }) => (
//                 <Row gutter={16} key={key}>
//                   <Col span={10}>
//                     <Form.Item
//                       {...restField}
//                       name={[name, "type"]}
//                       fieldKey={[key, "type"]}
//                       rules={[
//                         { required: true, message: "Please enter fee type" },
//                       ]}
//                     >
//                       <Input placeholder="Fee type (e.g., Service, Cleaning)" />
//                     </Form.Item>
//                   </Col>

//                   <Col span={10}>
//                     <Form.Item
//                       {...restField}
//                       name={[name, "amount"]}
//                       fieldKey={[key, "amount"]}
//                       rules={[
//                         { required: true, message: "Please enter fee amount" },
//                       ]}
//                     >
//                       <InputNumber
//                         min={0}
//                         style={{ width: "100%" }}
//                         placeholder="Enter fee amount"
//                       />
//                     </Form.Item>
//                   </Col>
//                   <Col span={4}>
//                     <Button
//                       type="link"
//                       onClick={() => remove(name)}
//                       icon={<i className="anticon anticon-delete" />}
//                     >
//                       Remove
//                     </Button>
//                   </Col>
//                 </Row>
//               ))}
//               <Button type="dashed" onClick={() => add()} block>
//                 Add Additional Fee
//               </Button>
//             </>
//           )}
//         </Form.List>
//       </Form.Item>
//     </Form>
//   );
// };

// export default PricingDetailsForm;
import React from "react";
import { InputNumber, Input, Button, Row, Col } from "antd";

interface PricingDetails {
  basePrice: number;
  electricityCost: number;
  waterCost: number;
  additionalFees: { type: string; amount: number }[];
}

interface PricingDetailsFormProps {
  pricingDetails: PricingDetails;
  onPricingDetailsChange: (updatedPricingDetails: PricingDetails) => void;
}

const PricingDetailsForm: React.FC<PricingDetailsFormProps> = ({
  pricingDetails,
  onPricingDetailsChange,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = (key: keyof PricingDetails, value: any) => {
    onPricingDetailsChange({
      ...pricingDetails,
      [key]: value,
    });
  };

  const handleAdditionalFeeChange = (
    index: number,
    key: keyof { type: string; amount: number },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any
  ) => {
    const updatedAdditionalFees = [...pricingDetails.additionalFees];
  
    if (key === "type") {
      updatedAdditionalFees[index].type = value as string;
    } else if (key === "amount") {
      updatedAdditionalFees[index].amount = value as number;
    }
  
    onPricingDetailsChange({
      ...pricingDetails,
      additionalFees: updatedAdditionalFees,
    });
  };
  const handleAddFee = () => {
    onPricingDetailsChange({
      ...pricingDetails,
      additionalFees: [
        ...pricingDetails.additionalFees,
        { type: "", amount: 0 },
      ],
    });
  };

  const handleRemoveFee = (index: number) => {
    const updatedAdditionalFees = pricingDetails.additionalFees.filter(
      (_, idx) => idx !== index
    );
    onPricingDetailsChange({
      ...pricingDetails,
      additionalFees: updatedAdditionalFees,
    });
  };

  return (
    <>
      {/* Base Price */}
      <div>
        <label>Base Price</label>
        <InputNumber
          min={0}
          value={pricingDetails.basePrice}
          style={{ width: "100%" }}
          onChange={(value) => handleInputChange("basePrice", value)}
          placeholder="Enter base price"
        />
      </div>

      {/* Electricity Cost */}
      <div>
        <label>Electricity Cost</label>
        <InputNumber
          min={0}
          value={pricingDetails.electricityCost}
          style={{ width: "100%" }}
          onChange={(value) => handleInputChange("electricityCost", value)}
          placeholder="Enter electricity cost"
        />
      </div>

      {/* Water Cost */}
      <div>
        <label>Water Cost</label>
        <InputNumber
          min={0}
          value={pricingDetails.waterCost}
          style={{ width: "100%" }}
          onChange={(value) => handleInputChange("waterCost", value)}
          placeholder="Enter water cost"
        />
      </div>

      {/* Additional Fees */}
      <div>
        <label>Additional Fees</label>
        {pricingDetails.additionalFees.map((fee, index) => (
          <Row gutter={16} key={index}>
            <Col span={10}>
              <Input
                value={fee.type}
                onChange={(e) =>
                  handleAdditionalFeeChange(index, "type", e.target.value)
                }
                placeholder="Fee type (e.g., Service, Cleaning)"
              />
            </Col>

            <Col span={10}>
              <InputNumber
                min={0}
                value={fee.amount}
                style={{ width: "100%" }}
                onChange={(value) =>
                  handleAdditionalFeeChange(index, "amount", value)
                }
                placeholder="Enter fee amount"
              />
            </Col>

            <Col span={4}>
              <Button type="link" onClick={() => handleRemoveFee(index)}>
                Remove
              </Button>
            </Col>
          </Row>
        ))}
        <Button type="dashed" onClick={handleAddFee} block>
          Add Additional Fee
        </Button>
      </div>
    </>
  );
};

export default PricingDetailsForm;
