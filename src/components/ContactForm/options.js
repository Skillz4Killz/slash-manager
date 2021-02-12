import { Fragment, useState } from "react";

import { Button, Modal, Form, Input, Radio, Switch, Space, Select } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const TestThis = () => {
  const [subcommandOptionType, setSubcommandOptionType] = useState([3, 3]);

  return (
    <Form.List name="suboptions">
      {(choices, { add, remove }) => (
        <Fragment>
          {choices.map((choice, index) => {
            return (
              <Fragment key={choice.key}>
                <Form.Item
                  name={`subtype-${index}`}
                  label="Select"
                  className="collection-create-form_last-form-item"
                  rules={[
                    {
                      required: true,
                      message: "Please select the type of option!",
                    },
                  ]}
                >
                  <Select
                    onSelect={(value) => {
                      console.log(subcommandOptionType);
                      subcommandOptionType.splice(index, 1, value);
                      console.log(subcommandOptionType);
                      setSubcommandOptionType(subcommandOptionType);
                      console.log(subcommandOptionType);
                    }}
                  >
                    <Select.Option value={3}>String</Select.Option>
                    <Select.Option value={4}>Integer</Select.Option>
                    <Select.Option value={5}>Boolean</Select.Option>
                    <Select.Option value={6}>User</Select.Option>
                    <Select.Option value={7}>Channel</Select.Option>
                    <Select.Option value={8}>Role</Select.Option>
                  </Select>
                </Form.Item>
                <Space style={{ display: "flex", marginBottom: 8 }} align="baseline">
                  <Form.Item
                    {...choice}
                    name={[choice.name, "name"]}
                    label="Option Name"
                    fieldKey={[choice.fieldKey, "name"]}
                    rules={[{ required: true, message: "A name is required." }]}
                  >
                    <Input placeholder="Option Name" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(choice.name)} />
                </Space>
                <Form.Item
                  {...choice}
                  name={[choice.name, "description"]}
                  label="Option Description"
                  fieldKey={[choice.fieldKey, "description"]}
                  rules={[{ required: true, message: "A description is required." }]}
                >
                  <Input placeholder="Option Description" />
                </Form.Item>

                <Space style={{ display: "flex", marginBottom: 8 }} align="baseline">
                  <Form.Item
                    {...choice}
                    name={[choice.name, "required"]}
                    fieldKey={[choice.fieldKey, "required"]}
                    label="Required?"
                  >
                    <Switch />
                  </Form.Item>
                  <Form.Item
                    {...choice}
                    name={[choice.name, "default"]}
                    fieldKey={[choice.fieldKey, "default"]}
                    label="Default?"
                  >
                    <Switch />
                  </Form.Item>
                </Space>

                {console.log("testing", subcommandOptionType)}
                {[3, 4].includes(subcommandOptionType[index]) ? (
                  <Form.List name="choices">
                    {(fields5, { add, remove }) => (
                      <Fragment>
                        {fields5.map((field3) => (
                          <Space key={field3.key} style={{ display: "flex", marginBottom: 8 }} align="baseline">
                            <Form.Item
                              {...field3}
                              label="Choice Name"
                              name={[field3.name, "name"]}
                              fieldKey={[field3.fieldKey, "name"]}
                              rules={[{ required: true, message: "Missing name" }]}
                            >
                              <Input placeholder="What the user sees" />
                            </Form.Item>
                            <Form.Item
                              {...field3}
                              label="Choice Value"
                              name={[field3.name, "value"]}
                              fieldKey={[field3.fieldKey, "value"]}
                              rules={[{ required: true, message: "Missing value" }]}
                            >
                              <Input placeholder="Value sent to you." />
                            </Form.Item>
                            <MinusCircleOutlined onClick={() => remove(field3.name)} />
                          </Space>
                        ))}
                        <Form.Item>
                          <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                            Add field
                          </Button>
                        </Form.Item>
                      </Fragment>
                    )}
                  </Form.List>
                ) : null}
              </Fragment>
            );
          })}
          <Form.Item>
            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
              Add Subcommand Option
            </Button>
          </Form.Item>
        </Fragment>
      )}
    </Form.List>
  );
};

export default ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Received values of form:", values);
  };

  const [mainType, setMainType] = useState(3);

  const onTypeChange = (event) => {
    console.log("on type", event);
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
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          type: 3,
        }}
        onValuesChange={onTypeChange}
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
            <Radio.Button value={2}>Subcommand Group</Radio.Button>
            <Radio.Button value={1}>Subcommand</Radio.Button>
            <Radio.Button value={3}>String</Radio.Button>
            <Radio.Button value={4}>Integer</Radio.Button>
            <Radio.Button value={5}>Boolean</Radio.Button>
            <Radio.Button value={6}>User</Radio.Button>
            <Radio.Button value={7}>Channel</Radio.Button>
            <Radio.Button value={8}>Role</Radio.Button>
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
            {(fields, { add, remove }) => (
              <Fragment>
                {fields.map((field) => (
                  <Space key={field.key} style={{ display: "flex", marginBottom: 8 }} align="baseline">
                    <Form.Item
                      {...field}
                      label="Choice Name"
                      name={[field.name, "name"]}
                      fieldKey={[field.fieldKey, "name"]}
                      rules={[{ required: true, message: "Missing name" }]}
                    >
                      <Input placeholder="What the user sees" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      label="Choice Value"
                      name={[field.name, "value"]}
                      fieldKey={[field.fieldKey, "value"]}
                      rules={[{ required: true, message: "Missing value" }]}
                    >
                      <Input placeholder="Value sent to you." />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Add field
                  </Button>
                </Form.Item>
              </Fragment>
            )}
          </Form.List>
        ) : null}

        {[1, 2].includes(mainType) ? (
          <Form.List name="secondoptions" onFinish={onFinish}>
            {(fields, { add, remove }) => (
              <Fragment>
                {fields.map((field) => (
                  <Fragment key={field.key}>
                    <Space style={{ display: "flex", marginBottom: 8 }} align="baseline">
                      <Form.Item
                        {...field}
                        name={[field.name, "name"]}
                        label={mainType === 2 ? "Subcommand Name" : "Option Name"}
                        fieldKey={[field.fieldKey, "name"]}
                        rules={[{ required: true, message: "A name is required." }]}
                      >
                        <Input placeholder="Option Name" />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(field.name)} />
                    </Space>
                    <Form.Item
                      {...field}
                      name={[field.name, "description"]}
                      label={mainType === 2 ? "Subcommand Description" : "Option Description"}
                      fieldKey={[field.fieldKey, "description"]}
                      rules={[{ required: true, message: "A description is required." }]}
                    >
                      <Input placeholder="Option Description" />
                    </Form.Item>

                    <Space style={{ display: "flex", marginBottom: 8 }} align="baseline">
                      <Form.Item
                        {...field}
                        name={[field.name, "required"]}
                        fieldKey={[field.fieldKey, "required"]}
                        label="Required?"
                      >
                        <Switch />
                      </Form.Item>
                      <Form.Item
                        {...field}
                        name={[field.name, "default"]}
                        fieldKey={[field.fieldKey, "default"]}
                        label="Default?"
                      >
                        <Switch />
                      </Form.Item>
                    </Space>
                  </Fragment>
                ))}

                {mainType === 1 ? (
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      Add Subcommand Option
                    </Button>
                  </Form.Item>
                ) : null}
              </Fragment>
            )}
          </Form.List>
        ) : null}

        {mainType === 2 ? (
          <Form.List name="subcmds">
            {(fields, { add, remove }) => (
              <Fragment>
                {fields.map((field) => (
                  <Fragment key={field.key}>
                    <Space style={{ display: "flex", marginBottom: 8 }} align="baseline">
                      <Form.Item
                        {...field}
                        name={[field.name, "name"]}
                        label="Subcommand Name"
                        fieldKey={[field.fieldKey, "name"]}
                        rules={[{ required: true, message: "A name is required." }]}
                      >
                        <Input placeholder="Subcommand Name" />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(field.name)} />
                    </Space>
                    <Form.Item
                      {...field}
                      name={[field.name, "description"]}
                      label="Subcommand Description"
                      fieldKey={[field.fieldKey, "description"]}
                      rules={[{ required: true, message: "A description is required." }]}
                    >
                      <Input placeholder="Subcommand Description" />
                    </Form.Item>

                    <Space style={{ display: "flex", marginBottom: 8 }} align="baseline">
                      <Form.Item
                        {...field}
                        name={[field.name, "required"]}
                        fieldKey={[field.fieldKey, "required"]}
                        label="Required?"
                      >
                        <Switch />
                      </Form.Item>
                      <Form.Item
                        {...field}
                        name={[field.name, "default"]}
                        fieldKey={[field.fieldKey, "default"]}
                        label="Default?"
                      >
                        <Switch />
                      </Form.Item>
                    </Space>

                    <TestThis></TestThis>
                  </Fragment>
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
    </Modal>
  );
};
