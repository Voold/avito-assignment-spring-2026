import {
  Text,
  Group,
  Paper,
  Checkbox,
  Divider,
  Switch,
  Stack,
  UnstyledButton,
} from "@mantine/core";

const Filter = () => {
  // TODO - store / logic
  return (
    <>
      <Stack w={256} gap={10}>
        <Paper w={256} h={247} p={16} withBorder>
          <Text
            style={{
              fontFamily: "Roboto",
              fontWeight: 500,
              fontSize: "16px",
              lineHeight: "24px",
            }}
          >
            Фильтры
          </Text>

          <Text
            mt={10}
            mb={8}
            style={{
              fontFamily: "Roboto",
              fontWeight: 500,
              fontSize: "14px",
            }}
          >
            Категории
          </Text>

          <Stack gap={8}>
            <Checkbox
              label="Авто"
              styles={{
                label: {
                  fontFamily: "Roboto",
                  fontSize: "14px",
                  lineHeight: "22px",
                },
              }}
            />
            <Checkbox
              label="Электроника"
              styles={{
                label: {
                  fontFamily: "Roboto",
                  fontSize: "14px",
                  lineHeight: "22px",
                },
              }}
            />
            <Checkbox
              label="Недвижимость"
              styles={{
                label: {
                  fontFamily: "Roboto",
                  fontSize: "14px",
                  lineHeight: "22px",
                },
              }}
            />
          </Stack>

          <Divider w={224} mt={10} />

          <Group mt={10} justify="space-between" wrap="nowrap">
            <Text fw={600}>Только требующие доработок</Text>
            <Switch size="md" w={44} h={22} />
          </Group>
        </Paper>

        <Paper
          w={256}
          h={41}
          withBorder
          display="flex"
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <UnstyledButton>
            <Text
              style={{
                fontFamily: "Inter",
                fontWeight: 400,
                fontSize: "14px",
                lineHeight: "100%",
                color: "gray",
              }}
            >
              Сбросить фильтры
            </Text>
          </UnstyledButton>
        </Paper>
      </Stack>
    </>
  );
};

export default Filter;
