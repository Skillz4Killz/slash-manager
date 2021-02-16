import { Fragment, useState } from "react";

import { Button, Modal, Form, Input, Radio, Switch, Space, Select } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import OptionForm from "./option";

const subcommandOptionType = {};
export default ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();

  const [mainType, setMainType] = useState(3);
  const [customOptions, setCustomOption] = useState([]);

  const onTypeChange = (event) => {
    console.log("on type", event, event.type);
    if (event.type) {
      setMainType(event.type);
    }


  };

  return (
    <Modal
      visible={visible}
      title="Create a new option"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        console.log(customOptions, "options");
        form
          .validateFields()
          .then((values) => {
            console.log("insidethe thene here", values);
            onCreate(values);
            form.resetFields();
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <OptionForm
        buttons={[
          { name: "Subcommand Group", value: 2 },
          { name: "Subcommand", value: 1 },
          { name: "String", value: 3 },
          { name: "Integer", value: 4 },
          { name: "Boolean", value: 5 },
          { name: "User", value: 6 },
          { name: "Channel", value: 7 },
          { name: "Role", value: 8 },
        ]}
        onCreate={onCreate}
        updateOptions={setCustomOption}
        options={customOptions}
        form={form}
      ></OptionForm>
    </Modal>
  );
};

// <Form
//         form={form}
//         layout="vertical"
//         name="form_in_modal"
//         initialValues={{
//           type: 3,
//         }}
//         onValuesChange={onTypeChange}
//       >
//         <Form.Item
//           name="type"
//           className="collection-create-form_last-form-item"
//           rules={[
//             {
//               required: true,
//               message: "Please select the type of option!",
//             },
//           ]}
//         >
//           <Radio.Group>
//             <Radio.Button value={2}>Subcommand Group</Radio.Button>
//             <Radio.Button value={1}>Subcommand</Radio.Button>
//             <Radio.Button value={3}>String</Radio.Button>
//             <Radio.Button value={4}>Integer</Radio.Button>
//             <Radio.Button value={5}>Boolean</Radio.Button>
//             <Radio.Button value={6}>User</Radio.Button>
//             <Radio.Button value={7}>Channel</Radio.Button>
//             <Radio.Button value={8}>Role</Radio.Button>
//           </Radio.Group>
//         </Form.Item>

//         <Form.Item
//           name="name"
//           label={mainType === 1 ? "Subcommand Name" : mainType === 2 ? "Subcommand Group Name" : "Option Name"}
//           rules={[
//             {
//               required: true,
//               message: "Please input the name of the option!",
//             },
//           ]}
//         >
//           <Input />
//         </Form.Item>
//         <Form.Item
//           name="description"
//           label={
//             mainType === 1
//               ? "Subcommand Description"
//               : mainType === 2
//               ? "Subcommand Group Description"
//               : "Option Description"
//           }
//           rules={[
//             {
//               required: true,
//               message: "Please input the description of the option!",
//             },
//           ]}
//         >
//           <Input type="textarea" />
//         </Form.Item>

//         <Space style={{ display: "flex", marginBottom: 8 }} align="baseline">
//           <Form.Item label="Required" name="required">
//             <Switch />
//           </Form.Item>

//           <Form.Item label="Default" name="default">
//             <Switch />
//           </Form.Item>
//         </Space>

//         {[3, 4].includes(mainType) ? (
//           <Form.List name="choices">
//             {(choices, { add, remove }) => (
//               <Fragment>
//                 {choices.map((choice) => (
//                   <Space key={choice.key} style={{ display: "flex", marginBottom: 8 }} align="baseline">
//                     <Form.Item
//                       {...choice}
//                       label="Choice Name"
//                       name={[choice.name, "name"]}
//                       fieldKey={[choice.fieldKey, "name"]}
//                       rules={[{ required: true, message: "Missing name" }]}
//                     >
//                       <Input placeholder="What the user sees" />
//                     </Form.Item>
//                     <Form.Item
//                       {...choice}
//                       label="Choice Value"
//                       name={[choice.name, "value"]}
//                       fieldKey={[choice.fieldKey, "value"]}
//                       rules={[{ required: true, message: "Missing value" }]}
//                     >
//                       <Input placeholder="Value sent to you." />
//                     </Form.Item>
//                     <MinusCircleOutlined onClick={() => remove(choice.name)} />
//                   </Space>
//                 ))}
//                 <Form.Item>
//                   <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
//                     Add Choice
//                   </Button>
//                 </Form.Item>
//               </Fragment>
//             )}
//           </Form.List>
//         ) : null}

//         {[1, 2].includes(mainType) ? (
//           <Form.List name="secondoptions" onFinish={onFinish}>
//             {(fields, { add, remove }) => (
//               <Fragment>
//                 {fields.map((field) => (
//                   <Fragment key={field.key}>
//                     <Space style={{ display: "flex", marginBottom: 8 }} align="baseline">
//                       <Form.Item
//                         {...field}
//                         name={[field.name, "name"]}
//                         label={mainType === 2 ? "Subcommand Name" : "Option Name"}
//                         fieldKey={[field.fieldKey, "name"]}
//                         rules={[{ required: true, message: "A name is required." }]}
//                       >
//                         <Input placeholder="Option Name" />
//                       </Form.Item>
//                       <MinusCircleOutlined onClick={() => remove(field.name)} />
//                     </Space>
//                     <Form.Item
//                       {...field}
//                       name={[field.name, "description"]}
//                       label={mainType === 2 ? "Subcommand Description" : "Option Description"}
//                       fieldKey={[field.fieldKey, "description"]}
//                       rules={[{ required: true, message: "A description is required." }]}
//                     >
//                       <Input placeholder="Option Description" />
//                     </Form.Item>

//                     <Space style={{ display: "flex", marginBottom: 8 }} align="baseline">
//                       <Form.Item
//                         {...field}
//                         name={[field.name, "required"]}
//                         fieldKey={[field.fieldKey, "required"]}
//                         label="Required?"
//                       >
//                         <Switch />
//                       </Form.Item>
//                       <Form.Item
//                         {...field}
//                         name={[field.name, "default"]}
//                         fieldKey={[field.fieldKey, "default"]}
//                         label="Default?"
//                       >
//                         <Switch />
//                       </Form.Item>
//                     </Space>
//                   </Fragment>
//                 ))}

//                 {mainType === 1 ? (
//                   <Form.Item>
//                     <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
//                       Add Subcommand Option
//                     </Button>
//                   </Form.Item>
//                 ) : null}
//               </Fragment>
//             )}
//           </Form.List>
//         ) : null}

//         {mainType === 2 ? (
//           <Form.List name="subcmds">
//             {(fields, { add, remove }) => (
//               <Fragment>
//                 {fields.map((field) => (
//                   <Fragment key={field.key}>
//                     <Space style={{ display: "flex", marginBottom: 8 }} align="baseline">
//                       <Form.Item
//                         {...field}
//                         name={[field.name, "name"]}
//                         label="Subcommand Name"
//                         fieldKey={[field.fieldKey, "name"]}
//                         rules={[{ required: true, message: "A name is required." }]}
//                       >
//                         <Input placeholder="Subcommand Name" />
//                       </Form.Item>
//                       <MinusCircleOutlined onClick={() => remove(field.name)} />
//                     </Space>
//                     <Form.Item
//                       {...field}
//                       name={[field.name, "description"]}
//                       label="Subcommand Description"
//                       fieldKey={[field.fieldKey, "description"]}
//                       rules={[{ required: true, message: "A description is required." }]}
//                     >
//                       <Input placeholder="Subcommand Description" />
//                     </Form.Item>

//                     <Space style={{ display: "flex", marginBottom: 8 }} align="baseline">
//                       <Form.Item
//                         {...field}
//                         name={[field.name, "required"]}
//                         fieldKey={[field.fieldKey, "required"]}
//                         label="Required?"
//                       >
//                         <Switch />
//                       </Form.Item>
//                       <Form.Item
//                         {...field}
//                         name={[field.name, "default"]}
//                         fieldKey={[field.fieldKey, "default"]}
//                         label="Default?"
//                       >
//                         <Switch />
//                       </Form.Item>
//                     </Space>

//                     <Form.List name="suboptions">
//                       {(options, { add, remove }) => (
//                         <Fragment>
//                           {options.map((option, index) => {
//                             return (
//                               <Fragment key={option.key}>
//                                 <Form.Item
//                                   name="type"
//                                   className="collection-create-form_last-form-item"
//                                   rules={[
//                                     {
//                                       required: true,
//                                       message: "Please select the type of option!",
//                                     },
//                                   ]}
//                                 >
//                                   <Radio.Group>
//                                     <Radio.Button value={3}>String</Radio.Button>
//                                     <Radio.Button value={4}>Integer</Radio.Button>
//                                     <Radio.Button value={5}>Boolean</Radio.Button>
//                                     <Radio.Button value={6}>User</Radio.Button>
//                                     <Radio.Button value={7}>Channel</Radio.Button>
//                                     <Radio.Button value={8}>Role</Radio.Button>
//                                   </Radio.Group>
//                                 </Form.Item>
//                                 <Space style={{ display: "flex", marginBottom: 8 }} align="baseline">
//                                   <Form.Item
//                                     {...option}
//                                     name={[option.name, "suboptname"]}
//                                     label="Option Name"
//                                     fieldKey={[option.fieldKey, "name"]}
//                                     rules={[{ required: true, message: "A name is required." }]}
//                                   >
//                                     <Input placeholder="Option Name" />
//                                   </Form.Item>
//                                   <MinusCircleOutlined onClick={() => remove(option.name)} />
//                                 </Space>
//                                 <Form.Item
//                                   {...option}
//                                   name={[option.name, "suboptdescription"]}
//                                   label="Option Description"
//                                   fieldKey={[option.fieldKey, "description"]}
//                                   rules={[{ required: true, message: "A description is required." }]}
//                                 >
//                                   <Input placeholder="Option Description" />
//                                 </Form.Item>

//                                 <Space style={{ display: "flex", marginBottom: 8 }} align="baseline">
//                                   <Form.Item
//                                     {...option}
//                                     name={[option.name, "suboptrequired"]}
//                                     fieldKey={[option.fieldKey, "required"]}
//                                     label="Required?"
//                                   >
//                                     <Switch />
//                                   </Form.Item>
//                                   <Form.Item
//                                     {...option}
//                                     name={[option.name, "suboptdefault"]}
//                                     fieldKey={[option.fieldKey, "default"]}
//                                     label="Default?"
//                                   >
//                                     <Switch />
//                                   </Form.Item>
//                                 </Space>

//                                 {[3, 4].includes(subcommandOptionType[index]) ? (
//                                   <Form.List name="subchoices">
//                                     {(choices, { add, remove }) => (
//                                       <Fragment>
//                                         {choices.map((choice) => (
//                                           <Space
//                                             key={choice.key}
//                                             style={{ display: "flex", marginBottom: 8 }}
//                                             align="baseline"
//                                           >
//                                             <Form.Item
//                                               {...choice}
//                                               label="Choice Name"
//                                               name={[choice.name, "subchoicename"]}
//                                               fieldKey={[choice.fieldKey, "name"]}
//                                               rules={[{ required: true, message: "Missing name" }]}
//                                             >
//                                               <Input placeholder="What the user sees" />
//                                             </Form.Item>
//                                             <Form.Item
//                                               {...choice}
//                                               label="Choice Value"
//                                               name={[choice.name, "subchoicevalue"]}
//                                               fieldKey={[choice.fieldKey, "value"]}
//                                               rules={[{ required: true, message: "Missing value" }]}
//                                             >
//                                               <Input placeholder="Value sent to you." />
//                                             </Form.Item>
//                                             <MinusCircleOutlined onClick={() => remove(choice.name)} />
//                                           </Space>
//                                         ))}
//                                         <Form.Item>
//                                           <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
//                                             Add Choice
//                                           </Button>
//                                         </Form.Item>
//                                       </Fragment>
//                                     )}
//                                   </Form.List>
//                                 ) : null}
//                               </Fragment>
//                             );
//                           })}
//                           <Form.Item>
//                             <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
//                               Add Subcommand Option
//                             </Button>
//                           </Form.Item>
//                         </Fragment>
//                       )}
//                     </Form.List>
//                   </Fragment>
//                 ))}
//                 <Form.Item>
//                   <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
//                     Add Subcommand
//                   </Button>
//                 </Form.Item>
//               </Fragment>
//             )}
//           </Form.List>
//         ) : null}
//       </Form>
