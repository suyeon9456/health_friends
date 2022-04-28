import React, { useRef, useEffect } from 'react';
import { BiChevronDown } from 'react-icons/bi';

import useIsState from '@/hooks/useIsState';
import {
  FilterWrap,
  FilterSelectorWrap,
  FilterSelector,
  FilterSelectorText,
  FilterArrrowWrap,
  FilterContent,
  CheckBoxGroup,
} from './style';
import { CheckBox, Icon } from '../../atoms';

const Filter = ({
  label,
  items,
  onChange,
  checkList,
}: {
  label: string;
  items: ReadonlyArray<{ value: string; text: string }>;
  onChange: (checked: boolean, value: string) => void;
  checkList: string[];
}) => {
  const filterEl = useRef<HTMLInputElement>(null);
  const filterSelectorEl = useRef<HTMLInputElement>(null);
  const [isShow, onChangeIsShow, setIsShow] = useIsState(false);

  useEffect(() => {
    const handleFilterOff = (e: { target: Node | null }) => {
      if (
        isShow &&
        !filterSelectorEl.current?.contains(e?.target) &&
        !filterEl.current?.contains(e.target)
      ) {
        setIsShow(false);
      }
    };
    window.addEventListener('click', handleFilterOff as EventListener);
    return () => {
      window.removeEventListener('click', handleFilterOff as EventListener);
    };
  }, [isShow]);
  return (
    <FilterWrap>
      <FilterSelectorWrap ref={filterSelectorEl} onClick={onChangeIsShow}>
        <FilterSelector>
          <FilterSelectorText>{label}</FilterSelectorText>
        </FilterSelector>
        <FilterArrrowWrap>
          <Icon icon={<BiChevronDown />} />
        </FilterArrrowWrap>
      </FilterSelectorWrap>
      <FilterContent show={isShow} ref={filterEl}>
        <CheckBoxGroup>
          {items.map((item, i) => (
            <CheckBox
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              label={item.text}
              value={item.value}
              checked={checkList.includes(item.value)}
              onChange={(e) => onChange(e.currentTarget.checked, item.value)}
            />
          ))}
        </CheckBoxGroup>
      </FilterContent>
    </FilterWrap>
  );
};

export default Filter;
