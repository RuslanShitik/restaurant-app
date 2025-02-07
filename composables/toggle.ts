type UseToggle = {
  value: Ref<boolean>;
  toggle: () => void;
};

export const useToggle = (): UseToggle => {
  const value = ref<boolean>(false);

  const toggle = () => {
    value.value = !value.value;
  };

  return { value, toggle };
};
