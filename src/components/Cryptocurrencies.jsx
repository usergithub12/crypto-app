import React, { useEffect, useState } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input, Table } from "antd";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Loader from "./Loader";

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  const redStyle = {
    color: "red",
    fontSize: "20px",
  };
  const greenStyle = {
    color: "green",
    fontSize: "20px",
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Daily Change 24h",
      dataIndex: "change",
      key: "change",
      sorter: (a, b) => a.change - b.change,
      // render(text, record) {
      //   return {
      //     props: {
      //       style: { background: parseInt(text) > 0 ? "green" : "red" }
      //     },
      //     children: <div>{text}</div>
      //   };
      // }
    },
  ];

  useEffect(() => {
    setCryptos(cryptosList?.data?.coins);

    const filteredData = cryptosList?.data?.coins.filter((item) =>
      item.name.toLowerCase().includes(searchTerm)
    );

    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  function onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
  }

  if (isFetching) return <Loader />;

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.id}>
            <Link key={currency.id} to={`/crypto/${currency.id}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={<img className="crypto-image" src={currency.iconUrl} />}
                hoverable
              >
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>
                  Daily Change:
                  {currency.change > 0 ? (
                    <span style={greenStyle}> {currency.change}%</span>
                  ) : (
                    <span style={redStyle}> {currency.change}%</span>
                  )}
                </p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
      <Row>
        <Col span={24}>
          <Table dataSource={cryptosList?.data?.coins} onChange={onChange} columns={columns}  rowClassName={(record, index) => (record.change > 0 ? "green" : "red")} />
        </Col>
      </Row>
    </>
  );
};

export default Cryptocurrencies;
