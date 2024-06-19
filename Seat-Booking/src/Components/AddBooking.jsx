import { Button, Col, Drawer, Form, Input, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setBooking, setIsOpen } from "../Redux/InitialSlice";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import isEmailValidator from "validator/lib/isEmail";
import { v4 as uuidv4 } from "uuid";

const schema = yup
  .object()
  .shape({
    name: yup.string().required("Name required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Mail is required")
      .test(
        "is-valid",
        (message) => `${message.path} is invalid`,
        (value) =>
          value
            ? isEmailValidator(value)
            : new yup.ValidationError("Invalid value")
      ),
  })
  .required();

const AddBooking = () => {
  const { isOpen } = useSelector((state) => state.initialSlice);
  const dispatch = useDispatch();
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { selectedSeat, curentDate } = useSelector(
    (state) => state.initialSlice
  );

  const onClose = () => {
    dispatch(setIsOpen(false));
  };

  const onBook = (formData) => {
    dispatch(
      setBooking({
        id: uuidv4(),
        seatNo: selectedSeat,
        BookingDate: curentDate,
        BookedBy: formData.name,
        email: formData.email,
      })
    );
    dispatch(setIsOpen(false));
    reset();
  };
  return (
    <>
      <Drawer
        title="Create a new account"
        width={720}
        onClose={onClose}
        open={isOpen}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
      >
        <Form
          layout="vertical"
          hideRequiredMark
          onFinish={handleSubmit(onBook)}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      style={{ width: "100%", padding: "10px" }}
                      placeholder="Please enter user name"
                    />
                  )}
                />
                {errors && (
                  <div className="text-red-500 text-[10px]">
                    {errors.name && errors.name.message}
                  </div>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item>
                <Controller
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <Input
                      {...field}
                      style={{
                        width: "100%",
                        padding: "10px",
                      }}
                      placeholder="name@gmail.com"
                    />
                  )}
                />
                {errors && (
                  <div className="text-red-500 text-[10px]">
                    {errors.email && errors.email.message}
                  </div>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row style={{ gap: "10px" }}>
            <Button onClick={() => dispatch(setIsOpen(false))}>Cancle</Button>
            <Button
              type="submit"
              htmlType="submit"
              className="bg-blue-500 text-white"
            >
              Submit
            </Button>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};
export default AddBooking;
