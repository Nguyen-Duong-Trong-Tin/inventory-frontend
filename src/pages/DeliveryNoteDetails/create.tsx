import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Form, InputNumber, Select, type FormProps } from "antd";

import { getCookie } from "@/helpers/cookies";
import {

  findDeliveryNoteDetails,
  createDeliveryNoteDetail,
} from "@/services/delivery-note-details";
import { findLots } from "@/services/lots";

import type ILot from "@/interfaces/lot";
import type IDeliveryNote from "@/interfaces/delivery-note";
import type IDeliveryNoteDetail from "@/interfaces/delivery-note-detail";
import { findDeliveryNotes } from "@/services/delivery-notes";

type FieldType = {
  deliveryNoteId: string;
  lotId: string;
  quantity: number;
  exportPrice: number;
  lineNo: number;
};

function CreateDeliveryNoteDetail() {
  const navigate = useNavigate();
  const accessToken = getCookie("accessToken");

  const [deliveryNotes, setDeliveryNotes] = useState<IDeliveryNote[]>([]);
  const [deliveryNoteDetails, setDeliveryNoteDetails] = useState<IDeliveryNoteDetail[]>([]);
  const [lots, setLots] = useState<ILot[]>([]);
  const [form] = Form.useForm<FieldType>();
  form.setFieldsValue({ lineNo: 1 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [noteRes, lotRes, detailRes] = await Promise.all([
          findDeliveryNotes({ accessToken }),
          findLots({ accessToken }),
          findDeliveryNoteDetails({ accessToken }),
        ]);

        setDeliveryNotes(noteRes.data?.deliverynotes?.deliverynotes ?? []);
        setLots(lotRes.data?.lots?.lots ?? []);
        setDeliveryNoteDetails(detailRes.data?.deliveryNoteDetails?.details ?? []);
      } catch {
        toast.error("Failed to load selection data.");
      }
    };

    fetchData();
  }, [accessToken]);

  const handleDeliveryNoteChange = (deliveryNoteId: string) => {
    const currentDetails = deliveryNoteDetails.filter(d => d.deliveryNoteId === deliveryNoteId);
    const nextLine = currentDetails.length + 1;
    form.setFieldsValue({ lineNo: nextLine });
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
     console.log("Submitted values:", values);
    try {
      const payload = {
        accessToken,
        deliveryNoteId: values.deliveryNoteId,
        lotId: values.lotId,
        quantity: values.quantity,
        exportPrice: values.exportPrice,
        lineNo: values.lineNo,
      };

      await createDeliveryNoteDetail(payload);
      toast.success("Create successfully.");
      navigate("/delivery-note-details");
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  return (
    <>
      <h1 className="text-center text-4xl font-extrabold tracking-tight">
        Create A Delivery Note Detail
      </h1>

      <Form layout="vertical" style={{ marginTop: 30 }} onFinish={onFinish} form={form}
       onValuesChange={(changedValues) => {
            if (changedValues.deliveryNoteId) {
              const currentDetails = deliveryNoteDetails.filter(
                (d) => d.deliveryNoteId === changedValues.deliveryNoteId
              );
              const nextLine = currentDetails.length + 1;
              form.setFieldsValue({ lineNo: nextLine });
            }
          }}
        >
        <Form.Item<FieldType>
          label="Delivery Note"
          name="deliveryNoteId"
          rules={[{ required: true, message: "Please select delivery note!" }]}
        >
          <Select placeholder="Select delivery note" onChange={handleDeliveryNoteChange}>
            {deliveryNotes.map((d) => (
              <Select.Option key={d._id} value={d._id}>
                {d.deliveryNo}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item<FieldType>
          label="Lot"
          name="lotId"
          rules={[{ required: true, message: "Please select lot!" }]}
        >
          <Select placeholder="Select lot">
            {lots.map((l) => (
              <Select.Option key={l._id} value={l._id}>
                {l.lotNumber}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item<FieldType>
          label="Quantity"
          name="quantity"
          rules={[{ required: true, message: "Please enter quantity!" }]}
        >
          <InputNumber min={1} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item<FieldType>
          label="Export Price"
          name="exportPrice"
          rules={[{ required: true, message: "Please enter export price!" }]}
        >
          <InputNumber<number>
            min={0}
            style={{ width: "100%" }}
            formatter={(value) =>
              value ? `₫ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""
            }
            parser={(value) =>
              value ? parseFloat(value.replace(/₫\s?|,/g, "")) : 0
            }
          />
        </Form.Item>

      <Form.Item<FieldType>
        label="Line No"
        name="lineNo"
        rules={[{ required: true, message: "Line No is required" }]}
      >
        <InputNumber
          readOnly
          min={1}
          style={{ width: "100%", backgroundColor: "#f5f5f5" }}
        />
      </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default CreateDeliveryNoteDetail;