import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getCookie } from "@/helpers/cookies";
import { getSuggesstions } from "@/services/suggestions";
import type ISuggesstion from "@/interfaces/suggestion.interface";
import type IProduct from "@/interfaces/product";
import { findProductById } from "@/services/products";
import { toast } from "react-toastify";
import type IProductType from "@/interfaces/product-type.interface";
import { findProductTypeById } from "@/services/product-types";
import {
  Button,
  Card,
  Col,
  Empty,
  List,
  Row,
  Skeleton,
  Spin,
  Typography,
} from "antd";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const { Title, Text } = Typography;

function SuggesstionPage() {
  const accessToken = getCookie("accessToken");

  const { customerId } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [suggesstion, setSuggesstion] = useState<ISuggesstion>();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [productTypes, setProductTypes] = useState<IProductType[]>([]);

  useEffect(() => {
    const fetchApi = async () => {
      setIsLoading(true);

      try {
        const responseSuggestion = await getSuggesstions({
          accessToken,
          customerId: customerId as string,
        });

        const products: IProduct[] = [];
        for (const suggestion of responseSuggestion.data.suggestions) {
          const responseProduct = await findProductById({
            accessToken,
            id: suggestion.productId,
          });

          products.push(responseProduct.data);
        }

        const productTypes: IProductType[] = [];
        for (const product of products) {
          const productType = await findProductTypeById({
            accessToken,
            id: product.productTypeId,
          });

          productTypes.push(productType.data);
        }

        setSuggesstion(responseSuggestion.data);
        setProducts(products);
        setProductTypes(productTypes);
      } catch {
        toast.error("Something went wrong.");
      }

      setIsLoading(false);
    };
    fetchApi();
  }, [accessToken, customerId]);

  const LoadingList = () => (
    <Card
      bordered={false}
      style={{ borderRadius: 12, boxShadow: "0 6px 18px rgba(0,0,0,0.06)" }}
    >
      <Row align="middle" style={{ marginBottom: 12 }}>
        <Col flex="auto">
          <Title level={4} style={{ margin: 0 }}>
            Gợi ý mua hàng
          </Title>
          <Text type="secondary">Đang tải đề xuất cho khách hàng...</Text>
        </Col>
        <Col>
          <Spin />
        </Col>
      </Row>

      <List
        itemLayout="horizontal"
        dataSource={[1, 2, 3, 4]}
        renderItem={() => (
          <List.Item>
            <Skeleton.Input
              active
              block
              style={{ height: 20, borderRadius: 6 }}
            />
          </List.Item>
        )}
      />
    </Card>
  );

  return (
    <>
      {isLoading ? (
        <LoadingList />
      ) : (
        <>
          <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance mb-4">
            List Of Product Suggesstions
          </h1>

          {suggesstion && products.length && productTypes.length ? (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead>Product Type</TableHead>
                    <TableHead className="text-right">Reason</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {suggesstion.suggestions.map((suggesstionItem, index) => (
                    <TableRow key={index}>
                      <TableCell>{products[index].name}</TableCell>
                      <TableCell>{products[index].status}</TableCell>
                      <TableCell>{products[index].unit}</TableCell>
                      <TableCell>{productTypes[index].name}</TableCell>
                      <TableCell className="text-right space-x-2">
                        {suggesstionItem.reason}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          ) : (
            <Empty />
          )}
        </>
      )}
    </>
  );
}

export default SuggesstionPage;
