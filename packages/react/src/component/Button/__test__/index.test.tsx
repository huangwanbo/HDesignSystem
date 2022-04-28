//@ts-nocheck
import React from "react";
import Button from "../Button";
import { shallow, mount, render } from "enzyme";
import { act } from "react-dom/test-utils";

describe("Button mount and unMount", () => {
  it("button could be updated an unmounted without errors", () => {
    const wrapper = mount(<Button />);
    expect(() => {
      wrapper.setProps({});
      wrapper.unmount();
    }).not.toThrow();
  });
});

describe("Button", () => {
  it("click callback correctly", () => {
    const mockFn = jest.fn();
    const component = mount(<Button onClick={mockFn} />);
    const button = component.find("button");
    button.simulate("click");
    const mockFnCallLength = mockFn.mock.calls.length;
    expect(mockFnCallLength).toBe(1);

    act(() => {
      component.setProps({
        disabled: true,
      });
    });

    button.simulate("click");
    expect(mockFn.mock.calls.length).toBe(mockFnCallLength);
  });

  it("render multiple children correctly", () => {
    const button = mount(<Button>1 2 3 </Button>);
    expect(button.text()).toEqual("1 2 3 ");
  });

  it("renders normal correctly", () => {
    const wrapper = shallow(<Button>按钮</Button>);
    expect(wrapper.find(".ds-button__container")).toExist();
    expect(wrapper.find(".ds-button__container-primary")).toExist();
    expect(wrapper.find(".ds-button__container-base")).toExist();
  });

  it("renders warming correctly", () => {
    const wrapper = shallow(<Button type="warning">按钮</Button>);
    expect(wrapper.find(".ds-button__container")).toExist();
    expect(wrapper.find(".ds-button__container-warning")).toExist();
    expect(wrapper.find(".ds-button__container-base")).toExist();
  });

  it("renders error correctly", () => {
    const wrapper = shallow(<Button type="error">按钮</Button>);
    expect(wrapper.find(".ds-button__container")).toExist();
    expect(wrapper.find(".ds-button__container-error")).toExist();
    expect(wrapper.find(".ds-button__container-base")).toExist();
  });

  it("renders success correctly", () => {
    const wrapper = shallow(<Button type="success">按钮</Button>);
    expect(wrapper.find(".ds-button__container")).toExist();
    expect(wrapper.find(".ds-button__container-success")).toExist();
    expect(wrapper.find(".ds-button__container-base")).toExist();
  });

  it("renders ghost correctly", () => {
    const wrapper = shallow(<Button type="ghost">按钮</Button>);
    expect(wrapper.find(".ds-button__container")).toExist();
    expect(wrapper.find(".ds-button__container-ghost")).toExist();
    expect(wrapper.find(".ds-button__container-base")).toExist();
  });

  it("renders size correctly", () => {
    const baseWrapper = shallow(<Button size="base">按钮</Button>);
    expect(baseWrapper.find(".ds-button__container-base")).toExist();
    const lgWrapper = shallow(<Button size="lg">按钮</Button>);
    expect(lgWrapper.find(".ds-button__container-lg")).toExist();
    const smWrapper = shallow(<Button size="sm">按钮</Button>);
    expect(smWrapper.find(".ds-button__container-sm")).toExist();
  });
});
