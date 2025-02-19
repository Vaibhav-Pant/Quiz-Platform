"use client";
import { useEffect, useState } from "react";
import { getQuizHistory } from "@/utils/indexedDB";
import Navbar from "@/components/ui/NavBar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function QuizHistory() {
  const [history, setHistory] = useState<{ date: string; score: number }[]>([]);

  useEffect(() => {
    getQuizHistory().then(setHistory);
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center p-6">
        <Card className="w-[600px]">
          <CardHeader>
            <h2 className="text-xl font-bold">📜 Quiz History</h2>
          </CardHeader>
          <CardContent>
            {history.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Score</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {history.map((attempt, index) => (
                    <TableRow key={index}>
                      <TableCell>{attempt.date}</TableCell>
                      <TableCell>{attempt.score}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-gray-500">No quiz history found.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
