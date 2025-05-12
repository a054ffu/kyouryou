import React, { useRef, useState } from 'react';
import Pulldown from '../Atoms/Pulldown';
import styles from '../../styles/Pulldowns.module.css';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import DeleteModal from '../Templates/DeleteModal';

const currentYear = new Date().getFullYear();

const Pulldowns = ({ data, onFilter }) => {
  const fileInputRef = useRef(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleRankClick = (item) => {
    const filteredData = data.filter((entry) => entry.Rank.includes(item));
    onFilter(filteredData);
  };

  const handleYearClick = (item) => {
    if (typeof item === 'number') {
      const filteredData = data.filter(
        (entry) => entry.Date === currentYear - item
      );
      onFilter(filteredData);
    } else {
      const filteredData = data.filter(
        (entry) => entry.Date <= currentYear - 6
      );
      onFilter(filteredData);
    }
  };

  const handleExcelClick = (item) => {
    if (item === 'Excel入力') {
      fileInputRef.current.click();
    } else if (item === 'Excelダウンロード') {
      handleDownload();
    } else if (item === 'フォーマット') {
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.aoa_to_sheet([
        [
          '施設ID',
          '管理事務所名',
          '管理先電話番号',
          '緯度,経度',
          '施設名',
          '施設名カナ',
          '路線',
          '所在地',
          '橋梁の種類',
          '架設年（西暦）',
          '橋長（m）',
          '幅員（m）',
          '種類',
          '次回点検年',
          '最新点検年度',
          '健全度',
          '点検年度',
          '健全度',
        ],
      ]);

      // テーブル範囲を設定
      const range = XLSX.utils.decode_range(ws['!ref']);
      ws['!autofilter'] = { ref: XLSX.utils.encode_range(range) };

      // ワークブックにワークシートを追加
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

      // エクセルファイルをバイナリ形式で書き出し
      XLSX.writeFile(wb, 'formatted_excel_file.xlsx');
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // ここでworksheetの内容を確認
        console.log('読み込んだワークシート:', worksheet);

        let json = XLSX.utils.sheet_to_json(worksheet);

        // JSONファイルの項目名を変更し、データがない場合はnullを設定
        json = json.map((item) => ({
          _id: item['施設ID'] || null,
          Inspector: item['管理事務所名'] || null,
          Tel: item['管理先電話番号'] || null,
          Id: item['緯度,経度'] || null,
          Name: item['施設名'] || null,
          Kana: item['施設名カナ'] || null,
          Road: item['路線'] || null,
          address: item['所在地'] || null,
          Keisiki: item['橋梁の種類'] || null,
          birth: item['架設年（西暦）'] || null,
          length: item['橋長（m）'] || null,
          width: item['幅員（m）'] || null,
          HowUse: item['種類'] || null,
          Schedule: item['次回点検'] || null,
          Date: item['最新点検年度'] || null,
          Rank: item['健全度'] || null,
          Date1: item['点検年度'] || null,
          Rank1: item['健全度'] || null,
          Date2: item['点検年度'] || null,
          Rank2: item['健全度'] || null,
          Date3: item['点検年度'] || null,
          Rank3: item['健全度'] || null,
          Date4: item['点検年度'] || null,
          Rank4: item['健全度'] || null,
          Date5: item['点検年度'] || null,
          Rank5: item['健全度'] || null,
          Date6: item['点検年度'] || null,
          Rank6: item['健全度'] || null,
          Date7: item['点検年度'] || null,
          Rank7: item['健全度'] || null,
          Date8: item['点検年度'] || null,
          Rank8: item['健全度'] || null,
          Date9: item['点検年度'] || null,
          Rank9: item['健全度'] || null,
          Date10: item['点検年度'] || null,
          Rank10: item['健全度'] || null,
          Date11: item['点検年度'] || null,
          Rank11: item['健全度'] || null,
          Date12: item['点検年度'] || null,
          Rank12: item['健全度'] || null,
          Date13: item['点検年度'] || null,
          Rank13: item['健全度'] || null,
          Date14: item['点検年度'] || null,
          Date15: item['点検年度'] || null,
          Rank15: item['健全度'] || null,
          Date16: item['点検年度'] || null,
          Rank16: item['健全度'] || null,
          Date17: item['点検年度'] || null,
          Rank17: item['健全度'] || null,
          Date18: item['点検年度'] || null,
          Rank18: item['健全度'] || null,
          Date19: item['点検年度'] || null,
          Rank19: item['健全度'] || null,
          Date20: item['点検年度'] || null,
          Rank20: item['健全度'] || null,
        }));

        console.log('読み込んだデータ:', XLSX.utils.sheet_to_json(worksheet));
        console.log('送信前のファイル内容:', json);

        // 各行を個別にPOSTリクエストで送信
        for (const row of json) {
          try {
            const response = await axios.post('/postopendata', row);
            console.log('送信されたデータ:', response.data);
          } catch (error) {
            if (error.response.status === 409) {
              // Assuming 409 Conflict for existing data
              try {
                const response = await axios.put(
                  `/putopendata/${row._id}`,
                  row
                );
                console.log('データが更新されました:', response.data);
              } catch (putError) {
                console.error(
                  'データの更新中にエラーが発生しました:',
                  putError
                );
              }
            } else {
              console.error('データの送信中にエラーが発生しました:', error);
            }
          }
        }
        alert('データの送信が完了しました');
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleDownload = () => {
    const filename = 'kyouryou.xlsx';
    if (!data || data.length === 0) {
      alert('ダウンロードするデータがありません');
      return;
    }

    // ヘッダーを追加
    const headers = [
      '施設ID',
      '管理事務所名',
      '管理先電話番号',
      '緯度,経度',
      '施設名',
      '施設名カナ',
      '路線',
      '所在地',
      '橋梁の種類',
      '架設年（西暦）',
      '橋長（m）',
      '幅員（m）',
      '種類',
      '次回点検年',
      '最新点検年度',
      '健全度',
      '点検年度',
      '健全度',
      '点検年度',
      '健全度',
    ];

    // データを配列に変換
    const dataArray = data.map((item) => Object.values(item));

    // ヘッダーとデータを結合
    const dataWithHeaders = [headers, ...dataArray];

    const worksheet = XLSX.utils.aoa_to_sheet(dataWithHeaders);

    // テーブル範囲を設定
    const range = XLSX.utils.decode_range(worksheet['!ref']);
    worksheet['!autofilter'] = { ref: XLSX.utils.encode_range(range) };

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    saveAs(blob, filename);
  };

  const handleDeleteClick = (item) => {
    if (item === 'ID指定でまとめて削除') {
      handleOpenDeleteModal();
    } else {
      console.log('ピクミン');
    }
  };

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDelete = () => {
    // Handle any additional logic after confirming delete
    setIsDeleteModalOpen(false);
  };

  return (
    <div className={styles.pulldownContainer}>
      <Pulldown
        text="健全度"
        items={['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ']}
        onItemClick={handleRankClick}
      />
      <Pulldown
        text="経過年度"
        items={[1, 2, 3, 4, 5, '6年以上']}
        onItemClick={handleYearClick}
      />
      <Pulldown
        text="Excel入出力"
        items={['Excel入力', 'Excelダウンロード', 'フォーマット']}
        onItemClick={handleExcelClick}
      />
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        accept=".xlsx, .xls"
      />
      <Pulldown
        text="まとめて削除"
        items={['ID指定でまとめて削除', 'ピンをまとめて削除']}
        onItemClick={handleDeleteClick}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onCancel={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default Pulldowns;
