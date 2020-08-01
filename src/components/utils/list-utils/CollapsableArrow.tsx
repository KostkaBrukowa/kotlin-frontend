import React, { ReactNode } from 'react';
import CaretRightOutlined from '@ant-design/icons/CaretRightOutlined';

interface CollapsableArrowProps {
  isActive?: boolean;
}

export const renderCollapsableArrow = ({ isActive }: CollapsableArrowProps): ReactNode => (
  <CaretRightOutlined rotate={isActive ? 90 : 0} />
);
