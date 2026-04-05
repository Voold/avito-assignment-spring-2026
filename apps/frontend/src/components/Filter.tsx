import {
  Text,
  Group,
  Paper,
  Checkbox,
  Divider,
  Switch,
  Stack,
  UnstyledButton,
  Collapse,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown } from "@tabler/icons-react";
import { useFiltersStore } from "@/store/useFiltersStore";
import { useViewStore } from "@/store/useViewStore";
import { FILTER_CATEGORIES } from "@/config";

const Filter = () => {
  const { params, setParams, resetParams } = useFiltersStore();
  const viewMode = useViewStore((state) => state.viewMode);

  const [opened, { toggle }] = useDisclosure(true);

  const selectedCategories = params.categories
    ? params.categories.split(",")
    : [];
  const needsRevisionOnly = params.needsRevision || false;

  const hasActiveFilters =
    selectedCategories.length > 0 || needsRevisionOnly || params.q;

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked
      ? [...selectedCategories, category]
      : selectedCategories.filter((c) => c !== category);

    setParams({
      categories:
        newCategories.length > 0 ? newCategories.join(",") : undefined,
      skip: 0,
    });
  };

  const handleNeedsRevisionChange = (checked: boolean) => {
    setParams({
      needsRevision: checked || undefined,
      skip: 0,
    });
  };

  const handleResetFilters = () => {
    resetParams({
      limit: viewMode === "list" ? 4 : 10,
      skip: 0,
    });
  };

  return (
    <Stack w={256} gap={10}>
      <Paper
        w={256}
        p={16}
        style={{ backgroundColor: "var(--app-bg-secondary-ads)" }}
      >
        <Text
          mb={10}
          style={{
            fontFamily: "Roboto",
            fontWeight: 500,
            fontSize: "16px",
            lineHeight: "24px",
          }}
        >
          Фильтры
        </Text>

        <UnstyledButton onClick={toggle} w="100%">
          <Group justify="space-between" mb={8}>
            <Text
              style={{
                fontFamily: "Roboto",
                fontWeight: 500,
                fontSize: "14px",
              }}
            >
              Категории
            </Text>
            <IconChevronDown
              size={16}
              style={{
                transform: opened ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 200ms ease",
              }}
            />
          </Group>
        </UnstyledButton>

        <Collapse expanded={opened}>
          <Stack gap={14} mb={10}>
            {FILTER_CATEGORIES.map((category) => (
              <Checkbox
                key={category.value}
                label={category.label}
                checked={selectedCategories.includes(category.value)}
                onChange={(e) =>
                  handleCategoryChange(category.value, e.currentTarget.checked)
                }
                styles={{
                  label: {
                    fontFamily: "Roboto",
                    fontSize: "14px",
                    lineHeight: "16px",
                  },
                  inner: {
                    width: "12px",
                    height: "16px",
                  },
                  input: {
                    width: "16px",
                    height: "16px",
                  },
                }}
              />
            ))}
          </Stack>
        </Collapse>

        <Divider w="100%" mt={10} mb={22} />

        <Group mt={10} justify="space-between" wrap="nowrap">
          <Text fw={600} size="sm">
            Только требующие доработок
          </Text>
          <Switch
            size="md"
            checked={needsRevisionOnly}
            styles={{
              thumb: {
                border: "9px solid #ffffff",
              },
              track: {
                backgroundColor: "var(--app-bg-search)",
              },
            }}
            onChange={(e) => handleNeedsRevisionChange(e.currentTarget.checked)}
          />
        </Group>
      </Paper>

      <Paper
        w={256}
        h={41}
        display="flex"
        style={{
          backgroundColor: "var(--app-bg-secondary-ads)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <UnstyledButton
          onClick={handleResetFilters}
          disabled={!hasActiveFilters}
          style={{
            cursor: hasActiveFilters ? "pointer" : "not-allowed",
            opacity: hasActiveFilters ? 1 : 0.5,
          }}
        >
          <Text
            style={{
              fontFamily: "Inter",
              fontWeight: 400,
              fontSize: "14px",
              lineHeight: "100%",
              color: hasActiveFilters ? "var(--app-text-primary)" : "gray",
            }}
          >
            Сбросить фильтры
          </Text>
        </UnstyledButton>
      </Paper>
    </Stack>
  );
};

export default Filter;
