import { Fragment, useState } from "react";
import { Button, Modal, Form, Input, Radio, Switch, Space, Select } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const OptionForm = ({ buttons }) => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Finished values of form:", values);
  };

  const [mainType, setMainType] = useState(3);
  const [customOptions, setCustomOption] = useState([]);

  const onTypeChange = (event) => {
    console.log("on type", event, event.type);
    if (event.type) {
      setMainType(event.type);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      name="form_in_modal"
      initialValues={{
        type: 3,
      }}
      onValuesChange={onTypeChange}
      onFinish={onFinish}
    >
      <Form.Item
        name="type"
        className="collection-create-form_last-form-item"
        rules={[
          {
            required: true,
            message: "Please select the type of option!",
          },
        ]}
      >
        <Radio.Group>
          {buttons.map((button, index) => (
            <Radio.Button key={index} value={button.value}>
              {button.name}
            </Radio.Button>
          ))}
        </Radio.Group>
      </Form.Item>

      <Form.Item
        name="name"
        label={mainType === 1 ? "Subcommand Name" : mainType === 2 ? "Subcommand Group Name" : "Option Name"}
        rules={[
          {
            required: true,
            message: "Please input the name of the option!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="description"
        label={
          mainType === 1
            ? "Subcommand Description"
            : mainType === 2
            ? "Subcommand Group Description"
            : "Option Description"
        }
        rules={[
          {
            required: true,
            message: "Please input the description of the option!",
          },
        ]}
      >
        <Input type="textarea" />
      </Form.Item>

      <Space style={{ display: "flex", marginBottom: 8 }} align="baseline">
        <Form.Item label="Required" name="required">
          <Switch />
        </Form.Item>

        <Form.Item label="Default" name="default">
          <Switch />
        </Form.Item>
      </Space>

      {[3, 4].includes(mainType) ? (
        <Form.List name="choices">
          {(choices, { add, remove }) => (
            <Fragment>
              {choices.map((choice) => (
                <Space key={choice.key} style={{ display: "flex", marginBottom: 8 }} align="baseline">
                  <Form.Item
                    {...choice}
                    label="Choice Name"
                    name={[choice.name, "name"]}
                    fieldKey={[choice.fieldKey, "name"]}
                    rules={[{ required: true, message: "Missing name" }]}
                  >
                    <Input placeholder="What the user sees" />
                  </Form.Item>
                  <Form.Item
                    {...choice}
                    label="Choice Value"
                    name={[choice.name, "value"]}
                    fieldKey={[choice.fieldKey, "value"]}
                    rules={[{ required: true, message: "Missing value" }]}
                  >
                    <Input placeholder="Value sent to you." />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(choice.name)} />
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Add Choice
                </Button>
              </Form.Item>
            </Fragment>
          )}
        </Form.List>
      ) : null}

      {mainType === 1 ? (
        <Form.List name="choices">
          {(choices, { add, remove }) => (
            <Fragment>
              {choices.map((choice) => (
                <Space key={choice.key} style={{ display: "flex", marginBottom: 8 }} align="baseline">
                  <OptionForm
                    buttons={[
                      { name: "String", value: 3 },
                      { name: "Integer", value: 4 },
                      { name: "Boolean", value: 5 },
                      { name: "User", value: 6 },
                      { name: "Channel", value: 7 },
                      { name: "Role", value: 8 },
                    ]}
                  ></OptionForm>
                  <MinusCircleOutlined onClick={() => remove(choice.name)} />
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Add Option
                </Button>
              </Form.Item>
            </Fragment>
          )}
        </Form.List>
      ) : null}

      {mainType === 2 ? (
        <Form.List name="choices">
          {(choices, { add, remove }) => (
            <Fragment>
              {choices.map((choice) => (
                <Space key={choice.key} style={{ display: "flex", marginBottom: 8 }} align="baseline">
                  <OptionForm
                    buttons={[
                      { name: "Subcommand", value: 1 },
                      { name: "String", value: 3 },
                      { name: "Integer", value: 4 },
                      { name: "Boolean", value: 5 },
                      { name: "User", value: 6 },
                      { name: "Channel", value: 7 },
                      { name: "Role", value: 8 },
                    ]}
                  ></OptionForm>
                  <MinusCircleOutlined onClick={() => remove(choice.name)} />
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Add Subcommand
                </Button>
              </Form.Item>
            </Fragment>
          )}
        </Form.List>
      ) : null}
    </Form>
  );
};

export default OptionForm;
