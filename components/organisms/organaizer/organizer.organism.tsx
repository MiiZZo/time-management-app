import React, { useState } from "react";
import { Calendar, Row, Col, Select, Radio } from "antd";
import {
  ExclamationCircleFilled,
  ShoppingOutlined,
  CheckCircleOutlined,
  MehOutlined,
  FrownOutlined,
  SmileOutlined
} from "@ant-design/icons";
import moment from "moment";
import { TodoList } from "./todo-list";

const localeMonths = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь"
];

export const Organizer = (): JSX.Element => {
  const [selectedDate, setSelectedDate] = useState<moment.Moment>(moment());
  const handleSelect = (date: moment.Moment) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <Row>
        <Col span={16}>
          <div style={{ height: "500px" }}>
            <Calendar
              value={selectedDate ? selectedDate : undefined}
              onSelect={handleSelect}
              onPanelChange={handleSelect}
              dateCellRender={DateCellRender}
              headerRender={({ value, type, onChange, onTypeChange }) => {
                const start = 0;
                const end = 12;
                const monthOptions = [];

                const current = value.clone();
                const localeData = value.localeData();
                const months = [];
                for (let i = 0; i < 12; i++) {
                  current.month(i);
                  months.push(localeData.monthsShort(current));
                }

                for (let index = start; index < end; index++) {
                  monthOptions.push(
                    <Select.Option
                      value={index}
                      className="month-item"
                      key={`${index}`}
                    >
                      {localeMonths[index]}
                    </Select.Option>
                  );
                }
                const month = value.month();

                const year = value.year();
                const options = [];
                for (let i = year - 10; i < year + 10; i += 1) {
                  options.push(
                    <Select.Option key={i} value={i} className="year-item">
                      {localeMonths[i]}
                    </Select.Option>
                  );
                }
                return (
                  <div style={{ padding: 8 }}>
                    <Row gutter={8}>
                      <Col>
                        <Radio.Group
                          size="small"
                          onChange={(e) => onTypeChange(e.target.value)}
                          value={type}
                        >
                          <Radio.Button value="month">Месяц</Radio.Button>
                          <Radio.Button value="year">Год</Radio.Button>
                        </Radio.Group>
                      </Col>
                      <Col>
                        <Select
                          size="small"
                          dropdownMatchSelectWidth={false}
                          className="my-year-select"
                          onChange={(newYear) => {
                            const now = value.clone().year(newYear as any);
                            onChange(now);
                          }}
                          value={String(year)}
                        >
                          {options}
                        </Select>
                      </Col>
                      <Col>
                        <Select
                          className="asdffdsaasdf"
                          size="small"
                          dropdownMatchSelectWidth={false}
                          value={localeMonths[month]}
                          onChange={(selectedMonth) => {
                            const newValue = value.clone();
                            newValue.month(parseInt(selectedMonth, 10));
                            onChange(newValue);
                          }}
                        >
                          {monthOptions}
                        </Select>
                      </Col>
                    </Row>
                  </div>
                );
              }}
            />
          </div>
        </Col>
        <Col span={8}>
          <TodoList
            data={{
              date: selectedDate,
              fullComplete: false,
              procentComplete: 0,
              todos: [{ title: "asdfasdfasdf", complete: true }]
            }}
            handleToggleComplete={() => {}}
            handleChangeTodoTitle={(e: React.ChangeEvent<HTMLInputElement>) => {
              console.log(e.target.value);
            }}
          />
        </Col>
      </Row>
    </div>
  );
};

const now = moment();

function DateCellRender(date: moment.Moment) {
  let preview = null;
  const procent = 0.5 * 100;
  if (now > date) {
    preview = <MehOutlined style={{ color: "orange", fontSize: 25 }} />;
    if (procent <= 30) {
      preview = <FrownOutlined style={{ color: "red", fontSize: 25 }} />;
    }
    if (procent >= 70) {
      preview = <SmileOutlined style={{ color: "green", fontSize: 25 }} />;
    }
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
      }}
    >
      {preview}
      <p>{procent !== null ? `${procent}%` : null}</p>
    </div>
  );
}
