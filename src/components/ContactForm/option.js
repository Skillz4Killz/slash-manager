import { Fragment, useState } from "react";
import { Button, Modal, Form, Input, Radio, Switch, Space, Select } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const OptionForm = ({ buttons, updateOptions, type, options, form }) => {
  // const [form] = Form.useForm();

  const [mainType, setMainType] = useState(3);

  const onTypeChange = (event) => {
    console.log("on option type", event, event.type, type);
    if (event.type) {
      setMainType(event.type);
    }

    if (type === "subcommands") {
      // const options = [
      //   {
      //     name: "user",
      //     description: "Get or edit permissions for a user",
      //     type: 2, // 2 is type SUB_COMMAND_GROUP
      //     options: [
      //       {
      //         name: "user",
      //         description: "The user to get",
      //         type: 6, // 6 is type USER
      //         required: true,
      //       },
      //       {
      //         name: "channel",
      //         description: "The channel permissions to get. If omitted, the guild permissions will be returned",
      //         type: 7, // 7 is type CHANNEL
      //         required: false,
      //       },
      //     ],
      //   },
      // ];
    } else if (type === "subcommandoptions") {
    } else {
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      name="form_in_modal"
      initialValues={{
        type: type === "subcommands" ? 1 : 3,
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
                    type="subcommandoptions"
                    updateOptions={updateOptions}
                    options={options}
                    form={form}
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
                    type="subcommands"
                    updateOptions={updateOptions}
                    options={options}
                    form={form}
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
