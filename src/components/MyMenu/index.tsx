import { Menu } from "antd";
import type { MenuProps } from "antd";

import {
  AppstoreOutlined,
  ContainerOutlined,
  FileDoneOutlined,
  FileTextOutlined,
  MedicineBoxOutlined,
  RadiusUprightOutlined,
  SafetyOutlined,
  SettingOutlined,
  UserOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

function MyMenu() {
  const navigate = useNavigate();

  const items: MenuItem[] = [
    
    {
      key: "product-types",
      label: "Product Types",
      icon: <MedicineBoxOutlined  />,
      onClick: () => {
        navigate("/product-types");
      }
    },
    {
      key: "suppliers",
      label: "Suppliers",
      icon: <RadiusUprightOutlined />,
      onClick: () => {
        navigate("/suppliers");
      },
    },
     {
      key: "delivery-notes",
      label: "Delivery Notes",
      icon: <FileTextOutlined   />,
      onClick: () => {
        navigate("/delivery-notes");
      },
    },
    {
      key: "warehouses",
      label: "Warehouses",
      icon: <ContainerOutlined  />,
      onClick: () => {
        navigate("/warehouses");
      },
    },
    {
      key: "warehouse-receipts",
      label: "Warehouses Receipts",
      icon: <FileDoneOutlined   />,
      onClick: () => {
        navigate("/warehouse-receipts");
      },
    },
    {
      key: "customers",
      label: "Customers",
      icon: <UserOutlined />,
      onClick: () => {
        navigate("/customers");
      },
    },
    {
      key: "roles",
      label: "Roles",
      icon: <SafetyOutlined/>,
      onClick: () => {
        navigate("/roles");
      },
    },
     {
      key: "employees",
      label: "Employees",
      icon: <UserSwitchOutlined/>,
      onClick: () => {
        navigate("/employees");
      },
    },
    {
      key: "sub2",
      label: "Navigation Two",
      icon: <AppstoreOutlined />,
    },
    {
      type: "divider",
    },
    {
      key: "sub4",
      label: "Navigation Three",
      icon: <SettingOutlined />,
    },
  ];

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
  };

  return (
    <Menu
      onClick={onClick}
      style={{ width: 256 }}
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
      items={items}
    />
  );
}

export default MyMenu;
