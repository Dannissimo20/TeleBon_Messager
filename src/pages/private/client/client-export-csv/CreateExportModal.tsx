import { SyntheticEvent, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { useFormik } from 'formik';
import { inject, observer } from 'mobx-react';
import { read, utils } from 'xlsx';

import { Form, TableWrapper, Title, Wrapper } from './CreateExportModal.styled';

import CommonButton from '../../../../components/shared/button/CommonButton';
import { IColumnType, Table } from '../../../../components/shared/table/Table';
import ClientsStore from '../../../../store/clientsStore';
import FilialStore from '../../../../store/filialStore';
import { apiPut } from '../../../../utils/apiInstance';
import { FlexContainer, FlexWithAlign, Text } from '../../../../utils/styleUtils';
import { validationClientAddSchema } from '../../../../utils/validation-input';

interface IData {
  col1: string;
  col2: string;
  col3?: string;
  col4?: string;
  col5?: string;
  col6?: string;
  tags?: string[];
}

interface IProps {
  clientsStore?: ClientsStore;
  filialStore?: FilialStore;
  closeModal?: () => void;
}

const CreateExportModal: React.FC<IProps> = observer((props) => {
  const { closeModal, clientsStore, filialStore } = props;
  const { t } = useTranslation();
  const [tableMode, setTableMode] = useState(false);
  const [tableData, setTableData] = useState<IData[]>([]);
  const [columns, setColumns] = useState<IColumnType<IData>[]>([]);
  const [columnSelects, setColumnSelects] = useState<{ i: number; val: string }[]>([]);

  const tableHeaderOptions = useMemo(
    () => [
      { title: 'Имя', value: 'name' },
      { title: 'Телефон', value: 'phone' },
      { title: 'Почта', value: 'email' },
      { title: 'Дата рождения', value: 'birthday' },
      { title: 'Дополнительный телефон', value: 'dopphone' },
      { title: 'Пол', value: 'sex' }
    ],
    []
  );

  const formik = useFormik({
    initialValues: {
      exportMethod: 'textarea',
      textarea: ''
    },
    validationSchema: validationClientAddSchema,
    onSubmit: () => {},
    validateOnBlur: true
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleImportExcel = (e: { target: { files: any } }) => {
    const files = e.target.files;
    if (files.length) {
      const file = files?.[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const wb = read(event?.target?.result);
        const sheets = wb.SheetNames;

        if (sheets.length) {
          const xlsRows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
          const rows = xlsRows.map((rowObj: unknown) => {
            // @ts-ignore
            const vals = Object.values(rowObj);

            return {
              col1: vals?.[0]?.toString() ?? '',
              col2: vals?.[1]?.toString() ?? '',
              col3: vals?.[2]?.toString() ?? '',
              col4: vals?.[3]?.toString() ?? '',
              col5: vals?.[4]?.toString() ?? '',
              col6: vals?.[5]?.toString() ?? ''
            };
          });

          setTableData(rows as IData[]);
          fillColumns(rows as IData[]);
          handleSubmit();
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const fillColumns = (rows: IData[]) => {
    const cols = Object.values(rows?.[0])
      .filter((el) => el)
      .map((el, i) => ({
        key: `col${i + 1}`,
        width: 200,
        title: (
          <select onChange={(e) => e.target.value && setColumnSelects((prev) => [...prev, { i, val: e.target.value }])}>
            <option value={''}>{''}</option>
            {tableHeaderOptions?.map((tag, tagIndex: number) => (
              <option
                key={`tag-${tagIndex}`}
                value={tag.value}
              >
                {tag.title}
              </option>
            ))}
          </select>
        )
      }));
    setColumns(cols);
    setTableMode(true);
  };

  const handleSubmit = (e?: SyntheticEvent) => {
    e?.preventDefault();
    if (!tableMode) {
      if (formik.values.exportMethod === 'textarea') {
        const strRows = formik.values.textarea.split('\n');
        const rows = strRows.map((row) => {
          const vals = row.split('\t');

          return {
            col1: vals?.[0] ?? '',
            col2: vals?.[1] ?? '',
            col3: vals?.[2] ?? '',
            col4: vals?.[3] ?? '',
            col5: vals?.[4] ?? '',
            col6: vals?.[5] ?? ''
          };
        });
        fillColumns(rows);
        setTableData(rows);
      }
    } else {
      if (columnSelects.length < columns.length) {
        alert('Пожалуйста, заполните все поля');

        return;
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const clients: any = [];
      const strRows = formik.values.exportMethod === 'textarea' ? formik.values.textarea.split('\n') : tableData;

      strRows.map((row) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const newClient: any = {
          filial: filialStore?.activeFilial?.id,
          status: '',
          telegram: false,
          viber: false,
          whatsapp: false,
          comstart: 0,
          comfinish: null,
          comment: '',
          comminterval: ''
        };
        // @ts-ignore
        const rowToSend = formik.values.exportMethod === 'textarea' ? row.split('\t') : Object.values(row);
        columnSelects.map((col) => {
          const { i, val } = col;
          newClient[val] = rowToSend[i];
        });
        if (newClient?.birthday) newClient.birthday = newClient.birthday.replaceAll('.', '-');
        if (newClient?.sex)
          newClient.sex =
            newClient.sex === 'M' || newClient.sex === 'М' || newClient.sex === 'муж' || newClient.sex === 'Муж' ? true : false;
        clients.push(newClient);

        return rowToSend;
      });

      Promise.all(clients.map((client: unknown) => apiPut('/client', client)))
        .then(async () => {
          toast.success('Клиенты успешно добавлены');
          await clientsStore?.fetchClients();
          closeModal?.();
        })
        .catch((e) => {
          console.log(e);
          toast.error(e);
        });
    }
  };

  return (
    <Wrapper>
      <Title>{t('Загрузка клиентов')}</Title>
      <Form onSubmit={handleSubmit}>
        {!tableMode ? (
          <FlexContainer
            $column
            $gap='20px'
          >
            <FlexContainer $gap='22px'>
              <Text>{t('Загрузка из Excel')}</Text>
              <div>
                <div
                  className='flex sex-input-wrap'
                  role='group'
                  aria-labelledby='my-radio-group'
                >
                  <label onClick={() => formik.setFieldValue('exportMethod', 'file')}>
                    <input
                      onBlur={formik.handleBlur}
                      value={formik.values.exportMethod === 'file' ? 'true' : 'false'}
                      onChange={() => formik.setFieldValue('exportMethod', 'file')}
                      name='exportMethod'
                      type='radio'
                      defaultChecked={formik.values.exportMethod === 'file'}
                    />
                    <span>{t('Загрузить файл')}</span>
                  </label>
                  <label onClick={() => formik.setFieldValue('exportMethod', 'textarea')}>
                    <input
                      onBlur={formik.handleBlur}
                      value={formik.values.exportMethod === 'textarea' ? 'true' : 'false'}
                      onChange={() => formik.setFieldValue('exportMethod', 'textarea')}
                      name='exportMethod'
                      type='radio'
                      defaultChecked={formik.values.exportMethod === 'textarea'}
                    />
                    <span>{t('Скопировать и вставить')}</span>
                  </label>
                </div>
              </div>
            </FlexContainer>

            {formik.values.exportMethod === 'textarea' ? (
              <>
                <Text>{t('Скопируйте и вставьте данные из Excel таблицы')}</Text>

                <textarea
                  onBlur={formik.handleBlur}
                  value={formik.values.textarea}
                  onChange={formik.handleChange}
                  rows={10}
                  name='textarea'
                />
              </>
            ) : (
              <input
                type='file'
                name='file'
                className='custom-file-input'
                id='inputGroupFile'
                required
                onChange={handleImportExcel}
                accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
              />
            )}
          </FlexContainer>
        ) : (
          <FlexContainer
            $column
            $gap='20px'
          >
            <TableWrapper>
              <Table
                data={tableData}
                columns={columns}
              />
            </TableWrapper>
          </FlexContainer>
        )}

        <FlexWithAlign
          $justify='end'
          className={'controls'}
        >
          <CommonButton
            colored={true}
            typeBtn='ghost'
            onClick={() => closeModal?.()}
          >
            {t('Отмена')}
          </CommonButton>
          <CommonButton
            colored={true}
            typeBtn='primary'
            type='submit'
            // disabled={!formik.isValid}
          >
            {t('Сохранить')}
          </CommonButton>
        </FlexWithAlign>
      </Form>
    </Wrapper>
  );
});

export default inject('clientsStore', 'filialStore')(CreateExportModal);
