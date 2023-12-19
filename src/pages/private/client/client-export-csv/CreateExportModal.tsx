import { SyntheticEvent, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { useFormik } from 'formik';
import { inject, observer } from 'mobx-react';
import { read, utils } from 'xlsx';

import {
  ExportFileWrapper,
  ExportSelect,
  ExportText,
  ExportTextarea,
  Form,
  TableWrapper,
  Title,
  Wrapper
} from './CreateExportModal.styled';

import { EIcon, IconNew as IconInstance } from '../../../../components/icons/medium-new-icons/icon';
import CommonButton from '../../../../components/shared/button/CommonButton';
import CommonDropdown from '../../../../components/shared/dropdawn/CommonDropdown';
import { IColumnType, Table } from '../../../../components/shared/table/Table';
import ClientsStore from '../../../../store/clientsStore';
import FilialStore from '../../../../store/filialStore';
import { apiPut } from '../../../../utils/apiInstance';
import { FlexContainer, FlexWithAlign } from '../../../../utils/styleUtils';
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
      { value: 'name', title: 'Имя* (обязательно)' },
      { value: 'phone', title: 'Телефон* (обязательно)' },
      { value: 'email', title: 'Почта (необязательно)' },
      { value: 'birthday', title: 'Дата рождения (необязательно)' },
      { value: 'dopphone', title: 'Дополнительный телефон (необязательно)' },
      { value: 'sex', title: 'Пол (необязательно)' },
      { value: 'filial', title: 'Филиал (необязательно)' }
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
        const wb = read(event?.target?.result, { cellDates: true, dateNF: 'dd"."mm"."yyyy' });
        const sheets = wb.SheetNames;
        if (sheets.length) {
          const xlsRows = utils.sheet_to_json(wb.Sheets[sheets[0]], { raw: false });
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
        width: 320,
        title: (
          <ExportSelect>
            <CommonDropdown
              currentValue={columnSelects}
              options={tableHeaderOptions}
              onChange={(selectedOption) => {
                setColumnSelects((prev) => [...prev, { i, val: selectedOption.additional.value }]);
              }}
              placeholder={'Выбрать заголовок'}
            />
          </ExportSelect>
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
        toast.error('Пожалуйста, заполните все поля');

        return;
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const clients: any = [];
      const strRows = formik.values.exportMethod === 'textarea' ? formik.values.textarea.split('\n') : tableData;
      strRows.map((row) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const newClient: any = {
          filial: filialStore?.activeFilial?.id,
          telegram: false,
          viber: false,
          whatsapp: false,
          comstart: 0,
          comfinish: 0,
          comment: '',
          sex: '',
          birthday: ''
        };
        // @ts-ignore
        const rowToSend = formik.values.exportMethod === 'textarea' ? row.split('\t') : Object.values(row);
        columnSelects.map((col) => {
          const { i, val } = col;
          newClient[val] = rowToSend[i];
        });

        if (newClient.phone && newClient.phone.indexOf('7') === 0) newClient.phone = '+'.concat('', newClient.phone);
        if (newClient.dopphone && newClient.dopphone.indexOf('7') === 0) newClient.dopphone = '+'.concat('', newClient.dopphone);

        clients.push(newClient);

        return rowToSend;
      });

      Promise.all(clients.map((client: unknown) => apiPut('/importclient', client)))
        .then(async () => {
          toast.success('Клиенты успешно добавлены');
          await clientsStore?.fetchClients();
          closeModal?.();
        })
        .catch((e) => {
          toast.error(e);
        });
    }
  };

  return (
    <Wrapper>
      <Title>{t('Импорт клиентской базы')}</Title>
      {tableMode && <ExportText>{t('Сопоставьте ваши данные с заголовками таблицы')}</ExportText>}
      <Form onSubmit={handleSubmit}>
        {!tableMode ? (
          <FlexContainer
            $column
            $gap='20px'
          >
            <FlexContainer $gap='22px'>
              <div>
                <div
                  className='flex sex-input-wrap'
                  role='group'
                  aria-labelledby='my-radio-group'
                >
                  <label onClick={() => formik.setFieldValue('exportMethod', 'textarea')}>
                    <input
                      onBlur={formik.handleBlur}
                      value={formik.values.exportMethod === 'textarea' ? 'true' : 'false'}
                      onChange={() => formik.setFieldValue('exportMethod', 'textarea')}
                      name='exportMethod'
                      type='radio'
                      defaultChecked={formik.values.exportMethod === 'textarea'}
                    />
                    <span>{t('Скопировать/вставить данные')}</span>
                  </label>
                  <label onClick={() => formik.setFieldValue('exportMethod', 'file')}>
                    <input
                      onBlur={formik.handleBlur}
                      value={formik.values.exportMethod === 'file' ? 'true' : 'false'}
                      onChange={() => formik.setFieldValue('exportMethod', 'file')}
                      name='exportMethod'
                      type='radio'
                      defaultChecked={formik.values.exportMethod === 'file'}
                    />
                    <span>{t('Загрузить документ')}</span>
                  </label>
                </div>
              </div>
            </FlexContainer>

            {formik.values.exportMethod === 'textarea' ? (
              <>
                <ExportTextarea
                  onBlur={formik.handleBlur}
                  placeholder={t('Вставить данные из табилцы')}
                  value={formik.values.textarea}
                  onChange={formik.handleChange}
                  rows={10}
                  name='textarea'
                />
              </>
            ) : (
              <ExportFileWrapper>
                <input
                  type='file'
                  name='file'
                  className='custom-file-input'
                  id='inputGroupFile'
                  required
                  onChange={handleImportExcel}
                  accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
                />
                <label htmlFor='inputGroupFile'>
                  <IconInstance name={EIcon.downloadoutline} />
                  <p>Перетащите в эту область или загрузите документ до 500 строк таблицы</p>
                </label>
              </ExportFileWrapper>
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
            type='button'
            onClick={() => closeModal?.()}
          >
            {t('Отмена')}
          </CommonButton>
          <CommonButton
            colored={true}
            typeBtn='primary'
            type='submit'
          >
            {t('Загрузить')}
          </CommonButton>
        </FlexWithAlign>
      </Form>
    </Wrapper>
  );
});

export default inject('clientsStore', 'filialStore')(CreateExportModal);
