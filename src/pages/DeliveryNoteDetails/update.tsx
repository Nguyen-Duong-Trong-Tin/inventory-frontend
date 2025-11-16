import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Form, InputNumber, Select, type FormProps } from "antd";

import { getCookie } from "@/helpers/cookies";
import { findDeliveryNotes } from "@/services/delivery-notes";
import { findLots } from "@/services/lots";
import {
  findDeliveryNoteDetailById,
  updateDeliveryNoteDetail,
} from "@/services/delivery-note-details";

import type ILot from "@/interfaces/lot";
import type IDeliveryNoteDetail from "@/interfaces/delivery-note-detail";
import type IDeliveryNote from "@/interfaces/delivery-note";

type FieldType = {
  deliveryNoteId: string;
  lotId: string;
  quantity: number;
  exportPrice: number;
  lineNo: number;
};

function UpdateDeliveryNoteDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const accessToken = getCookie("accessToken");

  const [detail, setDetail] = useState<IDeliveryNoteDetail>();
  const [notes, setNotes] = useState<IDeliveryNote[]>([]);
  const [lots, setLots] = useState<ILot[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [detailRes, noteRes, lotRes] = await Promise.all([
          findDeliveryNoteDetailById({ accessToken, id: id as string }),
          findDeliveryNotes({ accessToken }),
          findLots({ accessToken }),
        ]);

        const data = detailRes.data;
        setDetail(data);
        setNotes(noteRes.data?.deliverynotes?.deliverynotes ?? []);
        setLots(lotRes.data?.lots?.lots ?? []);

        form.setFieldsValue({
          deliveryNoteId: data.deliveryNoteId,
          lotId: data.lotId,
          quantity: data.quantity,
          exportPrice: data.exportPrice,
          lineNo: data.lineNo,
        });
      } catch {
        toast.error("Failed to load data.");
      }
    };

    fetchData();
  }, [accessToken, id, form]);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      // Nếu cần xử lý quantityDiff sau này
      const quantityDiff = values.quantity - (detail?.quantity ?? 0);

      await updateDeliveryNoteDetail({
        accessToken,
        id: id as string,
        deliveryNoteId: values.deliveryNoteId,
        lotId: values.lotId,
        quantity: values.quantity,
        exportPrice: values.exportPrice,
        // ❌ Không gửi quantityDiff vì backend không hỗ trợ
      });

      toast.success("Update successfully.");
      navigate("/delivery-note-details");
    } catch {
      toast.error("Something went wrong.");
    }
  };

  return (
    <>
      <h1 className="text-center text-4xl font-extrabold tracking-tight">
        Update Delivery Note Detail
      </h1>

      {detail && (
        <Form
          layout="vertical"
          style={{ marginTop: 30 }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item<FieldType>
            label="Delivery Note"
            name="deliveryNoteId"
            rules={[{ required: true, message: "Please select delivery note!" }]}
          >
            <Select placeholder="Select delivery note" disabled>
              {notes.map((n) => (
                <Select.Option key={n._id} value={n._id}>
                  {n.deliveryNo}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item<FieldType>
            label="Lot"
            name="lotId"
            rules={[{ required: true, message: "Please select lot!" }]}
          >
            <Select placeholder="Select lot" disabled>
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
                value ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đ" : ""
              }
              parser={(value) =>
                value ? parseFloat(value.replace(/[ đ.]/g, "").replace(/\./g, "")) : 0
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
              style={{
                width: "100%",
                backgroundColor: "#f5f5f5",
              }}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
}

export default UpdateDeliveryNoteDetail;